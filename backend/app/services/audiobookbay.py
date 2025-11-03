import httpx, re, asyncio
from .settings_svc import get as get_settings

async def search(term: str):
    cfg = get_settings()
    base = cfg.get("AudiobookBayUrl", "https://audiobookbay.is")
    url = f"{base}/?s={term}"
    async with httpx.AsyncClient(timeout=15) as client:
        r = await client.get(url)
        if r.status_code != 200:
            return []
        html = r.text
        matches = re.findall(r'<a href="(https?://[^\"]+/torrent/[^\"]+)"[^>]*>([^<]+)</a>', html, re.IGNORECASE)
        results = []
        for link, title in matches:
            try:
                pr = await client.get(link)
                m = re.search(r'(magnet:\?xt=urn:[^\'\"]+)', pr.text, re.IGNORECASE)
                magnet = m.group(1) if m else None
                results.append({"title": title.strip(), "magnet": magnet, "url": link, "source": "AudiobookBay"})
            except Exception:
                continue
        return results
