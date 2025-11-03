# Spokenarr

Spokenarr — automated audiobook manager.
This repository includes a FastAPI backend, Storybook-based React frontend (Storybook is the main UI), Docker Compose, and GitHub Actions to build and publish Docker images.

## Quick start (development)
1. Copy `.env.example` to `.env` and edit values
2. Build and run:
```bash
docker compose up --build
```

Open:
- Storybook UI (main app): http://localhost:6080
- API health: http://localhost:5080/api/health

## Notes
- Integrations (Prowlarr, Deluge, NZBGet) are configurable via the UI settings and disabled by default.
- Docker Hub repos used in CI: `nate8727/spokenarr-api` and `nate8727/spokenarr-web`.
