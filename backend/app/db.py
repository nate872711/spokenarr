import os
import sqlalchemy
import databases
import logging
from sqlalchemy import Table, Column, Integer, String, MetaData, DateTime, select, update, delete
from datetime import datetime

# ---------- SETUP ----------
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./spokenarr.db")
AUDIO_DIR = "/app/audio"
LOG_DIR = "/app/logs"
LOG_PATH = os.path.join(LOG_DIR, "spokenarr.log")

# Ensure logs directory exists
os.makedirs(LOG_DIR, exist_ok=True)

# Configure logging
logging.basicConfig(
    filename=LOG_PATH,
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

# ---------- DATABASE ----------
database = databases.Database(DATABASE_URL)
metadata = MetaData()

audiobooks = Table(
    "audiobooks",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String, nullable=False),
    Column("author", String),
    Column("year", String),
    Column("cover_url", String),
    Column("file_path", String),
    Column("status", String, default="queued"),  # queued, downloading, downloaded
    Column("created_at", DateTime, default=datetime.utcnow),
)

engine = sqlalchemy.create_engine(str(DATABASE_URL).replace("+asyncpg", ""))
metadata.create_all(engine)


# ---------- CONNECTION MANAGEMENT ----------
async def connect():
    await database.connect()
    logging.info("Database connection established.")


async def disconnect():
    await database.disconnect()
    logging.info("Database connection closed.")


# ---------- CORE QUERIES ----------
async def get_audiobooks(limit: int = 50, status: str | None = None, not_status: str | None = None):
    query = select(audiobooks).order_by(audiobooks.c.created_at.desc()).limit(limit)
    if status:
        query = query.where(audiobooks.c.status == status)
    if not_status:
        query = query.where(audiobooks.c.status != not_status)

    rows = await database.fetch_all(query)
    await _auto_update_downloaded(rows)
    await _cleanup_missing_files()
    return rows


async def add_audiobook(title, author=None, year=None, cover_url=None, file_path=None, status="queued"):
    query = audiobooks.insert().values(
        title=title,
        author=author,
        year=year,
        cover_url=cover_url,
        file_path=file_path,
        status=status,
        created_at=datetime.utcnow(),
    )
    audiobook_id = await database.execute(query)
    logging.info(f"Added audiobook: '{title}' (ID: {audiobook_id}) with status '{status}'.")
    return audiobook_id


async def update_audiobook_status(audiobook_id: int, status: str):
    query = update(audiobooks).where(audiobooks.c.id == audiobook_id).values(status=status)
    await database.execute(query)
    logging.info(f"Updated audiobook ID {audiobook_id} → status='{status}'.")


# ---------- HOUSEKEEPING ----------
async def _auto_update_downloaded(rows):
    """
    Automatically mark audiobooks as 'downloaded' if the file exists in AUDIO_DIR.
    """
    updated_count = 0
    for row in rows:
        if row["status"] != "downloaded" and row["file_path"]:
            file_name = os.path.basename(row["file_path"])
            file_path = os.path.join(AUDIO_DIR, file_name)
            if os.path.exists(file_path):
                await database.execute(
                    update(audiobooks)
                    .where(audiobooks.c.id == row["id"])
                    .values(status="downloaded")
                )
                logging.info(f"📘 File found for '{row['title']}' — marked as downloaded.")
                updated_count += 1

    if updated_count > 0:
        logging.info(f"✅ Auto-updated {updated_count} audiobooks to 'downloaded'.")


async def _cleanup_missing_files():
    """
    Remove database records for audiobooks whose files no longer exist on disk.
    """
    all_books = await database.fetch_all(select(audiobooks))
    removed_count = 0

    for book in all_books:
        if book["file_path"]:
            file_name = os.path.basename(book["file_path"])
            full_path = os.path.join(AUDIO_DIR, file_name)
            if not os.path.exists(full_path):
                await database.execute(delete(audiobooks).where(audiobooks.c.id == book["id"]))
                logging.warning(f"🗑 Removed orphaned entry '{book['title']}' — missing file: {file_name}")
                removed_count += 1

    if removed_count > 0:
        logging.info(f"🧹 Cleaned up {removed_count} missing audiobook entries.")
