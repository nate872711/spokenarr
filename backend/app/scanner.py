# backend/app/scanner.py
import os
from pathlib import Path

AUDIOBOOK_ROOT = "/data/audiobooks"

def scan_audiobooks():
    audiobooks = []
    root = Path(AUDIOBOOK_ROOT)
    if not root.exists():
        print(f"⚠️ Audiobook root path not found: {AUDIOBOOK_ROOT}")
        return []

    for folder in root.iterdir():
        if folder.is_dir():
            # Basic metadata
            title = folder.name
            author = "Unknown"
            files = [f for f in folder.glob("*.mp3")]
            if len(files) == 0:
                continue
            audiobooks.append({
                "title": title,
                "author": author,
                "files": len(files),
                "path": str(folder)
            })
    return audiobooks
