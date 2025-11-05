import os
import sqlalchemy
import databases

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@spokenarr-db:5432/spokenarr")

# Create async database connection
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# Define SQLAlchemy table (if not auto-managed elsewhere)
audiobooks = sqlalchemy.Table(
    "audiobooks",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String(255)),
    sqlalchemy.Column("author", sqlalchemy.String(255)),
    sqlalchemy.Column("description", sqlalchemy.Text),
    sqlalchemy.Column("cover_url", sqlalchemy.String(255)),
    sqlalchemy.Column("status", sqlalchemy.String(50)),
)

# Sync engine for migrations / setup
engine = sqlalchemy.create_engine(str(DATABASE_URL).replace("+asyncpg", ""))


# ---------- CONNECTION MANAGEMENT ----------
async def connect():
    """Connect to the database."""
    if not database.is_connected:
        await database.connect()


async def disconnect():
    """Disconnect from the database."""
    if database.is_connected:
        await database.disconnect()


# ---------- DATABASE QUERIES ----------
async def get_audiobooks(limit: int = 25, status: str | None = None, not_status: str | None = None):
    """Fetch audiobooks with optional status filtering."""
    if not database.is_connected:
        await connect()

    query = "SELECT id, title, author, description, cover_url, status FROM audiobooks WHERE 1=1"
    values = {}

    if status:
        query += " AND status = :status"
        values["status"] = status

    if not_status:
        query += " AND status != :not_status"
        values["not_status"] = not_status

    query += " ORDER BY id DESC LIMIT :limit"
    values["limit"] = limit

    rows = await database.fetch_all(query=query, values=values)
    return [dict(row) for row in rows]


async def get_audiobook(id: int):
    """Get a single audiobook by ID."""
    if not database.is_connected:
        await connect()

    row = await database.fetch_one("SELECT * FROM audiobooks WHERE id = :id", {"id": id})
    return dict(row) if row else None


async def add_audiobook(title: str, author: str, description: str = "", cover_url: str = "", status: str = "new"):
    """Add a new audiobook record."""
    if not database.is_connected:
        await connect()

    query = """
        INSERT INTO audiobooks (title, author, description, cover_url, status)
        VALUES (:title, :author, :description, :cover_url, :status)
        RETURNING id
    """
    values = {
        "title": title,
        "author": author,
        "description": description,
        "cover_url": cover_url,
        "status": status,
    }

    new_id = await database.execute(query=query, values=values)
    return {"id": new_id, "title": title, "author": author, "status": status}


async def update_audiobook_status(id: int, status: str):
    """Update audiobook download/processing status."""
    if not database.is_connected:
        await connect()

    query = "UPDATE audiobooks SET status = :status WHERE id = :id"
    await database.execute(query=query, values={"id": id, "status": status})
    return {"id": id, "status": status}


async def search_audiobooks(query: str):
    """Search audiobooks by title or author."""
    if not database.is_connected:
        await connect()

    sql = """
        SELECT id, title, author, description, cover_url, status
        FROM audiobooks
        WHERE LOWER(title) LIKE LOWER(:q)
           OR LOWER(author) LIKE LOWER(:q)
        ORDER BY title ASC
        LIMIT 50
    """
    rows = await database.fetch_all(query=sql, values={"q": f"%{query}%"})
    return [dict(row) for row in rows]
