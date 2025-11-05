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

# --- Database Engine ---
engine = sqlalchemy.create_engine(
    DATABASE_URL.replace("+asyncpg", ""),  # use sync engine for metadata creation
)

# --- Core Functions ---
async def connect():
    """Connect to the database."""
    try:
        await database.connect()
        print("✅ Connected to database")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")


async def disconnect():
    """Disconnect from the database."""
    try:
        await database.disconnect()
        print("🛑 Disconnected from database")
    except Exception as e:
        print(f"⚠️ Database disconnect error: {e}")


async def fetch_one(query, values=None):
    """Fetch a single row."""
    return await database.fetch_one(query=query, values=values or {})


async def fetch_all(query, values=None):
    """Fetch multiple rows."""
    return await database.fetch_all(query=query, values=values or {})


async def execute(query, values=None):
    """Execute insert/update/delete queries."""
    return await database.execute(query=query, values=values or {})


# --- Initialization ---
def init_db():
    """Ensure required tables exist."""
    metadata.create_all(engine)
    print("📦 Database tables ensured (settings, audiobooks).")


# --- Example Query Methods ---
async def get_audiobooks(limit: int = 25):
    query = audiobooks.select().limit(limit)
    rows = await fetch_all(query)
    return [dict(r) for r in rows]
