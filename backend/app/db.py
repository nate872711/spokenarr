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

# create tables synchronously for simplicity (on container build/runtime this may run)
def init_sync():
    engine = create_engine(DATABASE_URL)
    metadata.create_all(engine)

async def connect():
    await database.connect()
    # ensure table exists
    try:
        init_sync()
    except Exception:
        pass

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

async def get_audiobooks(limit: int = 50):
    query = audiobooks.select().limit(limit)
    rows = await database.fetch_all(query)
    return [dict(r) for r in rows]
