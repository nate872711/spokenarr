import os, json
from pathlib import Path

SETTINGS_PATH = os.getenv('SETTINGS_PATH', '/app/config/settings.json')

_default = {
    "ProwlarrUrl": "http://localhost:9789",
    "ProwlarrApiKey": "",
    "AudiobookBayUrl": "https://audiobookbay.is",
    "DelugeUrl": "http://host.docker.internal:8112/json",
    "DelugePassword": "deluge",
    "NZBGetUrl": "http://host.docker.internal:6789/jsonrpc",
    "NZBGetUsername": "nzbget",
    "NZBGetPassword": "tegbzn6789",
    "DownloadsCompletedPath": "/data/downloads/completed"
}

def ensure_default():
    p = Path(SETTINGS_PATH)
    p.parent.mkdir(parents=True, exist_ok=True)
    if not p.exists():
        p.write_text(json.dumps(_default, indent=2))

def get():
    p = Path(SETTINGS_PATH)
    if not p.exists():
        ensure_default()
    return json.loads(p.read_text())

def save(updates: dict):
    s = get()
    s.update(updates)
    Path(SETTINGS_PATH).write_text(json.dumps(s, indent=2))
