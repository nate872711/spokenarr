import os
import databases
import sqlalchemy

# Load DATABASE_URL from environment or fallback
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://spokenarr:spokenarr_pass@db:5432/spokenarr"
)

# Initialize async database connection
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# --- Table Definitions ---
settings = sqlalchemy.Table(
    "settings",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("download_path", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("auto_download", sqlalchemy.Boolean, nullable=False, default=True),
    sqlalchemy.Column("notifications", sqlalchemy.Boolean, nullable=False, default=True),
    sqlalchemy.Column("preferred_source", sqlalchemy.String, nullable=True, default="AudiobookBay"),
)

audiobooks = sqlalchemy.Table(
    "audiobooks",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("author", sqlalchemy.String, nullable=True),
    sqlalchemy.Column("cover_url", sqlalchemy.String, nullable=True),
    sqlalchemy.Column("file_path", sqlalchemy.String, nullable=True),
    sqlalchemy.Column("added_at", sqlalchemy.DateTime, server_default=sqlalchemy.func.now()),
)

# --- Engine ---
engine = sqlalchemy.create_engine(
    DATABASE_URL.replace("+asyncpg", ""),  # use sync engine for schema creation
)

# --- Core Database Functions ---
async def connect():
    try:
        await database.connect()
        print("✅ Connected to database")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")


async def disconnect():
    try:
        await database.disconnect()
        print("🛑 Disconnected from database")
    except Exception as e:
        print(f"⚠️ Database disconnect error: {e}")


async def fetch_one(query, values=None):
    return await database.fetch_one(query=query, values=values or {})


async def fetch_all(query, values=None):
    return await database.fetch_all(query=query, values=values or {})


async def execute(query, values=None):
    return await database.execute(query=query, values=values or {})


# --- Initialization & Seeding ---
def init_db():
    """Ensure required tables exist and seed with initial data if empty."""
    metadata.create_all(engine)
    print("📦 Database tables ensured (settings, audiobooks).")
    seed_audiobooks()


def seed_audiobooks():
    """Populate the audiobooks table with some sample entries if empty."""
    with engine.connect() as conn:
        count = conn.execute(sqlalchemy.text("SELECT COUNT(*) FROM audiobooks")).scalar()
        if count == 0:
            print("📚 Seeding sample audiobooks...")
            sample_data = [
                {
                    "title": "The Hobbit",
                    "author": "J.R.R. Tolkien",
                    "cover_url": "https://covers.openlibrary.org/b/id/6979861-L.jpg",
                    "file_path": "/app/audio/the_hobbit.mp3",
                },
                {
                    "title": "1984",
                    "author": "George Orwell",
                    "cover_url": "https://covers.openlibrary.org/b/id/7222246-L.jpg",
                    "file_path": "/app/audio/1984.mp3",
                },
                {
                    "title": "Dune",
                    "author": "Frank Herbert",
                    "cover_url": "https://covers.openlibrary.org/b/id/8100924-L.jpg",
                    "file_path": "/app/audio/dune.mp3",
                },
                {
                    "title": "The Martian",
                    "author": "Andy Weir",
                    "cover_url": "https://covers.openlibrary.org/b/id/8379081-L.jpg",
                    "file_path": "/app/audio/the_martian.mp3",
                },
            ]
            for book in sample_data:
                conn.execute(audiobooks.insert().values(**book))
            print(f"✅ Seeded {len(sample_data)} audiobooks.")
        else:
            print("ℹ️ Audiobooks already present; skipping seed.")


# --- Example Query Methods ---
async def get_audiobooks(limit: int = 25):
    query = audiobooks.select().limit(limit)
    rows = await fetch_all(query)
    return [dict(r) for r in rows]
