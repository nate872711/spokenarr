import asyncio, os, shutil
from .settings_svc import get as get_settings
from .db import add_audiobook

async def import_loop():
    while True:
        try:
            cfg = get_settings()
            completed = cfg.get('DownloadsCompletedPath', '/data/downloads/completed')
            target_root = '/data/audiobooks'
            if os.path.isdir(completed):
                for fname in os.listdir(completed):
                    fpath = os.path.join(completed, fname)
                    if os.path.isfile(fpath):
                        title = os.path.splitext(fname)[0]
                        dest_dir = os.path.join(target_root, sanitize(title))
                        os.makedirs(dest_dir, exist_ok=True)
                        dest_path = os.path.join(dest_dir, fname)
                        try:
                            shutil.move(fpath, dest_path)
                            await add_audiobook({'title': title, 'file_path': dest_path})
                        except Exception:
                            pass
        except Exception:
            pass
        await asyncio.sleep(30)

def sanitize(s):
    return ''.join(c if c.isalnum() or c in ' ._-()' else '_' for c in s)
