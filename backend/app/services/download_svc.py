import httpx, base64
from .settings_svc import get as get_settings

async def send_to_deluge(magnet: str) -> bool:
    cfg = get_settings()
    url = cfg.get('DelugeUrl') or 'http://host.docker.internal:8112/json'
    password = cfg.get('DelugePassword') or 'deluge'
    payload = {'method':'auth.login','params':[password],'id':1}
    async with httpx.AsyncClient(timeout=15) as client:
        try:
            r = await client.post(url, json=payload)
            if r.status_code != 200 or 'true' not in r.text:
                return False
            add = {'method':'core.add_torrent_magnet','params':[magnet, {}],'id':2}
            r2 = await client.post(url, json=add)
            return r2.status_code == 200
        except Exception:
            return False

async def send_to_nzbget(nzb_url: str, title: str) -> bool:
    cfg = get_settings()
    url = cfg.get('NZBGetUrl') or 'http://host.docker.internal:6789/jsonrpc'
    user = cfg.get('NZBGetUsername') or 'nzbget'
    pwd = cfg.get('NZBGetPassword') or 'tegbzn6789'
    payload = {'method':'appendurl','params':[nzb_url, title, 'audiobooks', 0, False],'id':1}
    auth = base64.b64encode(f"{user}:{pwd}".encode()).decode()
    headers = {'Authorization': f"Basic {auth}"}
    async with httpx.AsyncClient(timeout=15) as client:
        try:
            r = await client.post(url, json=payload, headers=headers)
            return r.status_code == 200
        except Exception:
            return False
