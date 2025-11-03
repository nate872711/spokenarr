![logo.png](frontend/src/assets/logo 409.png)

# Spokenarr

Spokenarr — automated audiobook manager using Storybook as the main web interface (dev server) for live editing.

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
