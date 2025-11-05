import os
import aiohttp
import asyncio
from .db import insert_audiobook

DOWNLOAD_PATH = "/data/audiobooks"

os.makedirs(DOWNLOAD_PATH, exist_ok=True)

async def download_file(session, url, dest_path):
    async with session.get(url) as response:
        if response.status == 200:
            with open(dest_path, "wb") as f:
                while True:
                    chunk = await response.content.read(1024)
                    if not chunk:
                        break
                    f.write(chunk)
            print(f"✅ Downloaded {dest_path}")
        else:
            print(f"⚠️ Failed to download {url}: {response.status}")

async def download_audiobook(title, author, link):
    """Download audiobook from link and add entry to DB"""
    safe_title = title.replace("/", "_").replace("\\", "_")
    dest = os.path.join(DOWNLOAD_PATH, f"{safe_title}.mp3")

    async with aiohttp.ClientSession() as session:
        await download_file(session, link, dest)

    await insert_audiobook({
        "title": title,
        "author": author,
        "path": dest,
        "files": 1
    })
    return {"title": title, "author": author, "path": dest}
