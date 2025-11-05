import asyncio
import aiohttp
import xml.etree.ElementTree as ET
from .db import insert_audiobook

FEEDS = [
    "https://example.com/audiobooks/rss",  # replace with real feed URL
]

async def fetch_feed(session, url):
    async with session.get(url) as resp:
        text = await resp.text()
    root = ET.fromstring(text)
    entries = []
    for item in root.findall(".//item"):
        title = item.find("title").text
        author = item.find("author").text if item.find("author") is not None else "Unknown"
        entries.append({"title": title, "author": author})
    return entries

async def discover_new():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_feed(session, feed) for feed in FEEDS]
        all_entries = await asyncio.gather(*tasks)
    flat = [e for sub in all_entries for e in sub]
    for entry in flat:
        await insert_audiobook({**entry, "files": 0, "path": ""})
    return flat
