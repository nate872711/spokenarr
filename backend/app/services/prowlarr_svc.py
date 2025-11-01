import httpx
from .settings_svc import get as get_settings

async def search(term: str):
    cfg = get_settings()
    base = cfg.get('ProwlarrUrl')
    key = cfg.get('ProwlarrApiKey')
    if not base:
        return []
    url = f"{base}/api/v1/search?term={term}&apikey={key}"
    async with httpx.AsyncClient(timeout=10) as client:
        try:
            r = await client.get(url)
            if r.status_code == 200:
                return r.json()
        except Exception:
            return []
    return []
