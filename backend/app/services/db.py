import os
from databases import Database
from sqlalchemy import MetaData, Table, Column, Integer, String, DateTime, create_engine
from sqlalchemy.sql import select
from datetime import datetime

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://spokenarr:spokenarr_pass@localhost:5432/spokenarr')
database = Database(DATABASE_URL)
metadata = MetaData()

audiobooks = Table(
    'audiobooks', metadata,
    Column('id', Integer, primary_key=True),
    Column('title', String),
    Column('author', String),
    Column('narrator', String),
    Column('runtime', String),
    Column('file_path', String),
    Column('imported_at', DateTime)
)

engine = create_engine(DATABASE_URL)
metadata.create_all(engine)

async def connect():
    await database.connect()

async def disconnect():
    await database.disconnect()

async def add_audiobook(record: dict):
    query = audiobooks.insert().values(
        title=record.get('title'),
        author=record.get('author', ''),
        narrator=record.get('narrator', ''),
        runtime=record.get('runtime', ''),
        file_path=record.get('file_path', ''),
        imported_at=datetime.utcnow()
    )
    await database.execute(query)

async def get_audiobooks(limit: int = 200):
    query = select([audiobooks]).order_by(audiobooks.c.imported_at.desc()).limit(limit)
    rows = await database.fetch_all(query)
    return [dict(r) for r in rows]
