import os
import sqlalchemy
import databases
from sqlalchemy import Table, Column, Integer, String, MetaData, Text

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://spokenarr:spokenarr_pass@spokenarr-db:5432/spokenarr")

database = databases.Database(DATABASE_URL)
metadata = MetaData()

audiobooks = Table(
    "audiobooks",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String(255), nullable=False),
    Column("author", String(255)),
    Column("description", Text),
    Column("cover_url", String(500)),
)

engine = sqlalchemy.create_engine(str(DATABASE_URL).replace("+asyncpg", ""))
metadata.create_all(engine)


async def connect():
    await database.connect()


async def disconnect():
    await database.disconnect()


async def get_audiobooks(limit: int = 25):
    query = audiobooks.select().limit(limit)
    return await database.fetch_all(query)


async def search_audiobooks(query: str, limit: int = 10):
    q = f"%{query.lower()}%"
    query = (
        audiobooks.select()
        .where(
            sqlalchemy.or_(
                sqlalchemy.func.lower(audiobooks.c.title).like(q),
                sqlalchemy.func.lower(audiobooks.c.author).like(q),
            )
        )
        .limit(limit)
    )
    return await database.fetch_all(query)


async def add_audiobook(title: str, author: str = "", description: str = "", cover_url: str = ""):
    """Add a new audiobook to the library if not already present."""
    existing = await database.fetch_one(
        audiobooks.select().where(audiobooks.c.title == title)
    )
    if existing:
        return existing

    query = audiobooks.insert().values(
        title=title, author=author, description=description, cover_url=cover_url
    )
    new_id = await database.execute(query)
    return {"id": new_id, "title": title, "author": author, "description": description, "cover_url": cover_url}
