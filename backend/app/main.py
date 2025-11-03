from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from . import db, settings_svc

app = FastAPI(title='Spokenarr API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.on_event('startup')
async def startup():
    await db.connect()
    settings_svc.ensure_default()

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
