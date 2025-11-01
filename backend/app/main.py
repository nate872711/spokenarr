from fastapi import FastAPI, HTTPException
from .services import settings_svc, audiobookbay, prowlarr_svc, download_svc, db, importer
from fastapi.middleware.cors import CORSMiddleware
import asyncio

app = FastAPI(title="Spokenarr API (FastAPI)")

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
    app.state.importer_task = asyncio.create_task(importer.import_loop())

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()
    task = getattr(app.state, 'importer_task', None)
    if task:
        task.cancel()

@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.get("/api/audiobooks")
async def list_audiobooks(limit: int = 200):
    rows = await db.get_audiobooks(limit)
    return rows

@app.get("/api/audiobooks/search")
async def search(term: str):
    if not term:
        raise HTTPException(status_code=400, detail="term required")
    results = await audiobookbay.search(term)
    prow = await prowlarr_svc.search(term)
    return {"audiobookbay": results, "prowlarr": prow}

@app.post("/api/audiobooks/download")
async def download_endpoint(payload: dict):
    title = payload.get("title")
    url = payload.get("url")
    client = payload.get("client")
    if not title or not url or not client:
        raise HTTPException(status_code=400, detail="title, url and client required")
    ok = False
    if client.lower() == "deluge":
        ok = await download_svc.send_to_deluge(url)
    elif client.lower() == "nzbget":
        ok = await download_svc.send_to_nzbget(url, title)
    else:
        raise HTTPException(status_code=400, detail="unsupported client")
    if not ok:
        raise HTTPException(status_code=500, detail="failed to queue")
    return {"status": "queued"}

@app.get("/api/settings")
async def get_settings():
    return settings_svc.get()

@app.post("/api/settings")
async def save_settings(payload: dict):
    settings_svc.save(payload)
    return {"status": "saved"}
