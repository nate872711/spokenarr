import os
import sqlalchemy
import databases
from datetime import datetime

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql+asyncpg://spokenarr:spokenarr_pass@db:5432/spokenarr"
)

# Async database instance
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# Define the audiobooks table
audiobooks = sqlalchemy.Table(
    "audiobooks",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String(255)),
    sqlalchemy.Column("author", sqlalchemy.String(255)),
    sqlalchemy.Column("cover_url", sqlalchemy.String(512), nullable=True),
    sqlalchemy.Column("added_at", sqlalchemy.DateTime, default=datetime.utcnow),
)

# Create engine (used for migrations and setup)
engine = sqlalchemy.create_engine(str(DATABASE_URL).replace("+asyncpg", ""))
metadata.create_all(engine)

# Core database helpers
async def connect():
    await database.connect()

async def disconnect():
    await database.disconnect()

async def fetch_all(query):
    rows = await database.fetch_all(query)
    return [dict(row) for row in rows]

async def fetch_one(query):
    row = await database.fetch_one(query)
    return dict(row) if row else None

async def execute(query):
    return await database.execute(query)


# CRUD functions
async def get_audiobooks(limit: int = 25):
    query = audiobooks.select().limit(limit)
    return await fetch_all(query)


async def delete_audiobook(book_id: int):
    query = audiobooks.delete().where(audiobooks.c.id == book_id)
    result = await execute(query)
    return bool(result)


async def update_audiobook(book_id: int, values: dict):
    query = (
        audiobooks.update()
        .where(audiobooks.c.id == book_id)
        .values(**values)
        .returning(audiobooks)
    )
    row = await fetch_one(query)
    return row


async def add_audiobook(title: str, author: str, cover_url: str = None):
    query = (
        audiobooks.insert()
        .values(
            title=title,
            author=author,
            cover_url=cover_url,
            added_at=datetime.utcnow(),
        )
        .returning(audiobooks)
    )
    row = await fetch_one(query)
    return row
