from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine
from sqlalchemy.orm import declarative_base
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://spokenarr:spokenarr_pass@db:5432/spokenarr")

engine: AsyncEngine = create_async_engine(DATABASE_URL, future=True, echo=False)
Base = declarative_base()
