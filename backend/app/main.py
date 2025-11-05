import os
from fastapi import FastAPI, HTTPException, Response, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, PlainTextResponse
from . import db, settings_svc

app = FastAPI(title="Spokenarr API")

AUDIO_PATH = "/app/audio"
LOG_PATH = "/app/logs/spokenarr.log"

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

# ---------- Health ----------
@app.get("/api/health")
async def health():
    return {"status": "ok"}

# ---------- Audiobooks ----------
@app.get("/api/audiobooks")
async def list_audiobooks(limit: int = 25, status: str | None = None, not_status: str | None = None):
    rows = await db.get_audiobooks(limit, status, not_status)
    return rows

# 🔍 New: Search Endpoint
@app.get("/api/search")
async def search_audiobooks(q: str = Query(..., description="Search by title or author")):
    """
    Search audiobooks by title or author.
    """
    try:
        results = await db.search_audiobooks(q)
        if not results:
            return {"results": [], "message": "No results found"}
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {e}")

# ---------- Upload Cover ----------
@app.post("/api/upload-cover")
async def upload_cover(file: UploadFile = File(...)):
    os.makedirs("/app/covers", exist_ok=True)
    file_path = f"/app/covers/{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    return {"message": "Cover uploaded", "path": file_path}

# ---------- Audio Serving ----------
@app.get("/audio/{filename}")
async def get_audio(filename: str):
    file_path = os.path.join(AUDIO_PATH, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/mpeg")
    raise HTTPException(status_code=404, detail="Audio file not found")

# ---------- Logs ----------
@app.get("/api/logs", response_class=PlainTextResponse)
async def get_logs(lines: int = 200):
    if not os.path.exists(LOG_PATH):
        raise HTTPException(status_code=404, detail="Log file not found")

    try:
        with open(LOG_PATH, "r", encoding="utf-8") as f:
            data = f.readlines()[-lines:]
        return "".join(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading log file: {e}")
