import os
from databases import Database
from sqlalchemy import MetaData, Table, Column, Integer, String, DateTime, create_engine
from datetime import datetime

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://spokenarr:spokenarr_pass@localhost:5432/spokenarr')
database = Database(DATABASE_URL)
metadata = MetaData()

audiobooks = Table(
    'audiobooks', metadata,
    Column('id', Integer, primary_key=True),
    Column('title', String),
    Column('author', String),
    Column('file_path', String),
    Column('imported_at', DateTime)
)

import random

MOCK_AUDIOBOOKS = [
    {"id": 1, "title": "Dune", "author": "Frank Herbert"},
    {"id": 2, "title": "Project Hail Mary", "author": "Andy Weir"},
    {"id": 3, "title": "Mistborn", "author": "Brandon Sanderson"},
    {"id": 4, "title": "The Martian", "author": "Andy Weir"},
    {"id": 5, "title": "The Hobbit", "author": "J.R.R. Tolkien"},
    {"id": 6, "title": "The Name of the Wind", "author": "Patrick Rothfuss"},
    {"id": 7, "title": "The Way of Kings", "author": "Brandon Sanderson"},
    {"id": 8, "title": "The Silent Patient", "author": "Alex Michaelides"},
]
def init_sync():
    engine = create_engine(DATABASE_URL)
    metadata.create_all(engine)

async def connect():
    try:
        init_sync()
    except Exception:
        pass
    await database.connect()

async def disconnect():
    await database.disconnect()

async def add_audiobook(record: dict):
    query = audiobooks.insert().values(
        title=record.get('title'),
        author=record.get('author',''),
        file_path=record.get('file_path',''),
        imported_at=datetime.utcnow()
    )
    await database.execute(query)

async def get_audiobooks(limit: int = 25):
    """
    Get audiobooks from database. If DB is empty or not connected, return mock data.
    """
    try:
        rows = await database.fetch_all("SELECT id, title, author FROM audiobooks LIMIT :limit", values={"limit": limit})
        if not rows:
            return random.sample(MOCK_AUDIOBOOKS, min(limit, len(MOCK_AUDIOBOOKS)))
        return rows
    except Exception as e:
        print("⚠️ Database unavailable, returning mock data:", e)
        return random.sample(MOCK_AUDIOBOOKS, min(limit, len(MOCK_AUDIOBOOKS)))
