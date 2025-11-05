from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
import os

from . import db, settings_svc

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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await db.connect()
    await settings_svc.ensure_default()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.get("/api/audiobooks")
async def list_audiobooks(limit: int = 25):
    rows = await db.get_audiobooks(limit)
    return rows

# 🆕 SETTINGS ENDPOINT
@app.get("/api/settings")
async def get_settings():
    """Fetch stored settings or create defaults."""
    settings = await settings_svc.get_settings()
    if not settings:
        settings = await settings_svc.ensure_default()
    return settings
