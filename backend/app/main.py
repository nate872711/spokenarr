import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from . import db, settings_svc

app = FastAPI(title="Spokenarr API")

AUDIO_PATH = "/app/audio"

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
    settings_svc.ensure_default()


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/audio/{filename}")
async def get_audio(filename: str):
    file_path = os.path.join(AUDIO_PATH, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/mpeg")
    return Response(status_code=404)


@app.get("/api/audiobooks")
async def list_audiobooks(limit: int = 25):
    rows = await db.get_audiobooks(limit)
    return rows


@app.get("/api/search")
async def search_audiobooks(q: str):
    # 1️⃣ Search local database first
    local = await db.search_audiobooks(q)
    results = [dict(row) for row in local]

    # 2️⃣ If no local results, fetch from Open Library
    if not results:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(f"https://openlibrary.org/search.json?q={q}")
            if r.status_code != 200:
                raise HTTPException(status_code=502, detail="Failed to fetch from Open Library")
            data = r.json()

            results = [
                {
                    "id": doc.get("key", "").replace("/works/", ""),
                    "title": doc.get("title", "Unknown Title"),
                    "author": ", ".join(doc.get("author_name", [])) if doc.get("author_name") else "Unknown Author",
                    "description": doc.get("first_sentence", [""])[0] if doc.get("first_sentence") else "",
                    "cover_url": f"https://covers.openlibrary.org/b/id/{doc.get('cover_i')}-L.jpg" if doc.get("cover_i") else "",
                    "source": "openlibrary",
                }
                for doc in data.get("docs", [])[:10]
            ]

    return {"results": results}


@app.post("/api/download/{book_id}")
async def download_audiobook(book_id: str, title: str, author: str = "", description: str = "", cover_url: str = ""):
    """Simulates downloading or adding an audiobook to the library."""
    added = await db.add_audiobook(title, author, description, cover_url)
    return {"status": "added", "book": added}
