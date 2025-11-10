from fastapi import FastAPI
from .api import router as api_router

app = FastAPI(title="Spokenarr API")

app.include_router(api_router)
