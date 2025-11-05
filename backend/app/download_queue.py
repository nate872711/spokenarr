import asyncio
import aiohttp
import os
from typing import Dict, List
from .db import insert_audiobook

DOWNLOAD_PATH = "/data/audiobooks"
os.makedirs(DOWNLOAD_PATH, exist_ok=True)

class DownloadQueue:
    def __init__(self, max_concurrent=3):
        self.queue = asyncio.Queue()
        self.active = set()
        self.max_concurrent = max_concurrent
        self.status: Dict[str, str] = {}
        self._runner_task = None

    async def start(self):
        if not self._runner_task:
            self._runner_task = asyncio.create_task(self._runner())
            print("📥 Download queue started...")

    async def add(self, title, author, link):
        job_id = f"{title}_{author}"
        if job_id in self.status:
            return {"status": "queued", "message": "Already queued or downloading"}
        await self.queue.put((title, author, link))
        self.status[job_id] = "queued"
        print(f"➕ Queued: {title}")
        return {"status": "queued", "title": title}

    async def _runner(self):
        while True:
            title, author, link = await self.queue.get()
            job_id = f"{title}_{author}"
            self.active.add(job_id)
            self.status[job_id] = "downloading"
            try:
                await self._download(title, author, link)
                self.status[job_id] = "done"
                print(f"✅ Completed: {title}")
            except Exception as e:
                print(f"❌ Failed {title}: {e}")
                self.status[job_id] = f"failed: {e}"
            finally:
                self.active.remove(job_id)
                self.queue.task_done()

    async def _download(self, title, author, link):
        safe_title = title.replace("/", "_").replace("\\", "_")
        dest = os.path.join(DOWNLOAD_PATH, f"{safe_title}.mp3")
        async with aiohttp.ClientSession() as session:
            async with session.get(link, timeout=30) as resp:
                if resp.status != 200:
                    raise Exception(f"HTTP {resp.status}")
                with open(dest, "wb") as f:
                    async for chunk in resp.content.iter_chunked(1024):
                        f.write(chunk)
        await insert_audiobook({
            "title": title,
            "author": author,
            "path": dest,
            "files": 1
        })

    async def get_status(self):
        return self.status

download_queue = DownloadQueue()
