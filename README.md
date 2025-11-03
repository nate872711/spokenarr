<div align="center">
  <img src="frontend/src/assets/logo.png" alt="Spokenarr Logo" width="160"/>

# 🎧 Spokenarr

**Automated Audiobook Manager inspired by Readarr**

_Download, organize, and track your audiobooks automatically._
</div>

Ports (default):
- API: http://localhost:5080
- Web (Storybook): http://localhost:6080

## Quick start (development)

1. Copy `.env.example` -> `.env` and adjust if needed.
2. Build and run:
```bash
docker compose up --build
```
3. Open Storybook UI (main app) at http://localhost:6080
4. API health: http://localhost:5080/api/health

## Notes
- Integrations (Prowlarr, Deluge, NZBGet) are configurable in settings (disabled by default).
- CI pushes images to Docker Hub repos `nate8727/spokenarr-api` and `nate8727/spokenarr-web`.
