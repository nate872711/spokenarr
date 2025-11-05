from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from . import db, settings_svc

import asyncio
from .discover import discover_new, periodic_discover

from .downloader import download_audiobook

app = FastAPI(title='Spokenarr API')

AUDIO_PATH = "/app/audio"  # mount a folder inside container

@app.get("/audio/{filename}")
async def get_audio(filename: str):
    file_path = os.path.join(AUDIO_PATH, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/mpeg")
    return Response(status_code=404)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

import sqlalchemy
from .db import metadata, database, audiobooks

@app.on_event("startup")
async def startup():
    await db.connect()
    settings_svc.ensure_default()
    engine = sqlalchemy.create_engine(str(database.url))
    metadata.create_all(engine)
    print("🗃 Database tables ensured.")
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, scan_audiobooks)

    # Run discovery once at startup
    asyncio.create_task(discover_new())
    # Schedule automatic updates every 12 hours
    asyncio.create_task(periodic_discover())

@app.on_event('shutdown')
async def shutdown():
    await db.disconnect()

@app.get('/api/health')
async def health():
    return {'status': 'ok'}

@app.get('/api/audiobooks')
async def list_audiobooks(limit: int = 25):
    rows = await db.get_audiobooks(limit)
    return rows

from .scanner import scan_audiobooks
import asyncio

@app.get("/api/scan")
async def scan_library():
    results = scan_audiobooks()
    return {"found": len(results), "audiobooks": results}

from .discover import discover_new

@app.get("/api/discover")
async def discover_endpoint():
    entries = await discover_new()
    return entries

from pydantic import BaseModel

class DownloadRequest(BaseModel):
    title: str
    author: str
    link: str

@app.post("/api/download")
async def trigger_download(req: DownloadRequest):
    """Download a single audiobook"""
    result = await download_audiobook(req.title, req.author, req.link)
    return {"status": "ok", "downloaded": result}
