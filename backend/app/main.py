import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from . import db, settings_svc

app = FastAPI(title="Spokenarr API")

AUDIO_PATH = "/app/audio"

# CORS for local and container-based frontend
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
    if hasattr(settings_svc, "ensure_default"):
        settings_svc.ensure_default()


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()


@app.get("/audio/{filename}")
async def get_audio(filename: str):
    file_path = os.path.join(AUDIO_PATH, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/mpeg")
    return Response(status_code=404)


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/audiobooks")
async def list_audiobooks(limit: int = 25):
    rows = await db.get_audiobooks(limit)
    return rows


@app.post("/api/audiobooks")
async def create_audiobook(request: Request):
    data = await request.json()
    title = data.get("title")
    author = data.get("author")
    cover_url = data.get("cover_url", None)

    if not title or not author:
        raise HTTPException(status_code=400, detail="Title and author are required")

    new_book = await db.add_audiobook(title, author, cover_url)
    return new_book


@app.put("/api/audiobooks/{book_id}")
async def update_audiobook(book_id: int, request: Request):
    data = await request.json()
    updated = await db.update_audiobook(book_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Audiobook not found")
    return updated


@app.delete("/api/audiobooks/{book_id}")
async def delete_audiobook(book_id: int):
    result = await db.delete_audiobook(book_id)
    if not result:
        raise HTTPException(status_code=404, detail="Audiobook not found")
    return {"status": "deleted", "id": book_id}
