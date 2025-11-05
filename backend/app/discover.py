import asyncio
import aiohttp
import xml.etree.ElementTree as ET
from .db import insert_audiobook

# Example feed sources (you can add more later)
FEEDS = [
    "https://audiobookbay.lu/feeds/new",  # Replace with actual working feed
]

async def fetch_feed(session, url):
    """Fetch and parse audiobook RSS feed"""
    try:
        async with session.get(url, timeout=15) as resp:
            text = await resp.text()
        root = ET.fromstring(text)
        items = []
        for item in root.findall(".//item"):
            title = item.findtext("title", "Untitled")
            author = item.findtext("author", "Unknown")
            link = item.findtext("link", "")
            items.append({
                "title": title.strip(),
                "author": author.strip() if author else "Unknown",
                "link": link,
                "files": 0,
                "path": "",
            })
        return items
    except Exception as e:
        print(f"⚠️ Error fetching feed {url}: {e}")
        return []

async def discover_new():
    """Fetch new audiobooks and insert them into DB"""
    print("🔍 Discovering new audiobooks...")
    async with aiohttp.ClientSession() as session:
        results = await asyncio.gather(*(fetch_feed(session, f) for f in FEEDS))
    discovered = [item for sublist in results for item in sublist]
    for book in discovered:
        await insert_audiobook(book)
    print(f"✅ Discovery complete: {len(discovered)} titles found")
    return discovered

async def periodic_discover():
    """Run discovery every 12 hours"""
    while True:
        await discover_new()
        await asyncio.sleep(12 * 3600)
