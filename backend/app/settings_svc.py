from . import db

DEFAULT_SETTINGS = {
    "downloadPath": "/app/audio",
    "autoDownload": True,
    "notifications": True,
    "preferredSource": "AudiobookBay",
}

async def ensure_default():
    """Ensure at least one settings row exists."""
    existing = await db.fetch_one("SELECT * FROM settings LIMIT 1;")
    if not existing:
        await db.execute(
            "INSERT INTO settings (download_path, auto_download, notifications, preferred_source) VALUES (:p, :a, :n, :s)",
            {
                "p": DEFAULT_SETTINGS["downloadPath"],
                "a": DEFAULT_SETTINGS["autoDownload"],
                "n": DEFAULT_SETTINGS["notifications"],
                "s": DEFAULT_SETTINGS["preferredSource"],
            },
        )
    return await get_settings()

async def get_settings():
    row = await db.fetch_one("SELECT * FROM settings LIMIT 1;")
    if not row:
        return None
    return {
        "downloadPath": row["download_path"],
        "autoDownload": row["auto_download"],
        "notifications": row["notifications"],
        "preferredSource": row["preferred_source"],
    }
