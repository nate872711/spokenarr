import os
from fastapi import FastAPI, HTTPException, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from . import db, settings_svc

app = FastAPI(title="Spokenarr API")

AUDIO_PATH = "/app/audio"  # Mount point for audio storage


# ---------- Middleware ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Startup / Shutdown ----------
@app.on_event("startup")
async def startup():
    await db.connect()
    settings_svc.ensure_default()


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()


# ---------- Health Check ----------
@app.get("/api/health")
async def health():
    return {"status": "ok"}


# ---------- Search Audiobooks ----------
@app.get("/api/search")
async def search_audiobooks(q: str):
    """
    Simulated audiobook search.
    In production, this can be wired to an external API (e.g. OpenLibrary, Audible, or AudiobookBay).
    """
    mock_results = [
        {
            "key": "book1",
            "title": f"{q} Volume 1",
            "author": "John Doe",
            "cover_url": "https://covers.openlibrary.org/b/id/8231856-L.jpg",
            "year": "2020",
        },
        {
            "key": "book2",
            "title": f"{q} Volume 2",
            "author": "Jane Smith",
            "cover_url": "https://covers.openlibrary.org/b/id/8235122-L.jpg",
            "year": "2021",
        },
    ]
    return {"results": mock_results}


# ---------- Queue Download ----------
@app.post("/api/queue")
async def queue_download(book: dict):
    """
    Adds an audiobook entry to the database as queued for download.
    """
    try:
        await db.add_audiobook(
            title=book.get("title"),
            author=book.get("author"),
            cover_url=book.get("cover_url"),
            year=book.get("year"),
            status="queued",
        )
        return {"message": f"{book.get('title')} queued successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------- Get All Audiobooks ----------
@app.get("/api/audiobooks")
async def list_audiobooks(limit: int = 50, status: str | None = None):
    """
    Returns a list of audiobooks sorted by download status and newest first.
    Optional query param: ?status=queued or ?status=downloaded
    """
    try:
        base_query = """
            SELECT id, title, author, cover_url, year, status, created_at
            FROM audiobooks
        """

        if status:
            base_query += " WHERE status = :status"

        base_query += """
            ORDER BY 
                CASE 
                    WHEN status = 'downloaded' THEN 1
                    WHEN status = 'queued' THEN 2
                    ELSE 3
                END,
                created_at DESC
            LIMIT :limit
        """

        rows = await db.database.fetch_all(
            base_query, {"status": status, "limit": limit}
        )
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")


# ---------- Update Audiobook Status ----------
@app.post("/api/update-status")
async def update_status(
    audiobook_id: int = Form(...), new_status: str = Form(...)
):
    """
    Update the status of a queued audiobook (e.g., from 'queued' → 'downloaded').
    """
    try:
        query = """
            UPDATE audiobooks
            SET status = :new_status
            WHERE id = :audiobook_id
            RETURNING id, title, status
        """
        result = await db.database.fetch_one(
            query, {"new_status": new_status, "audiobook_id": audiobook_id}
        )

        if not result:
            raise HTTPException(status_code=404, detail="Audiobook not found")

        return {"message": f"Status updated to {new_status}", "audiobook": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------- Serve Audio Files ----------
@app.get("/audio/{filename}")
async def get_audio(filename: str):
    file_path = os.path.join(AUDIO_PATH, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/mpeg")
    return Response(status_code=404)
