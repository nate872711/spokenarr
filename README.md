<div align="center">
  <img src="frontend/src/assets/logo.png" alt="Spokenarr Logo" width="160"/>

  # 🎧 Spokenarr
  **Automated Audiobook Manager inspired by Readarr**

  _Download, organize, and track your audiobooks automatically._
</div>

---

## ✨ Features

- 🔍 Integrates with **Prowlarr**, **NZBGet**, and **Deluge** (external instances)
- 📚 Searches **AudiobookBay** for magnets
- 🧠 Automatically imports completed downloads
- 🗂 Organizes your audiobooks into structured folders
- 🎨 Modern orange-gradient UI (brand match)

---

## 🖥️ Web UI Preview

![Spokenarr Web UI Preview](docs/preview.png)

---

## 🚀 Quick Start (Docker Compose)

```bash
git clone https://github.com/nate872711/spokenarr.git
cd spokenarr
docker compose up --build
```

Open:
- Web UI → http://localhost:3180
- API → http://localhost:5180

### Example production docker-compose snippet (use images from Docker Hub)

```yaml
version: "3.9"
services:
  spokenarr-db:
    image: postgres:16
    environment:
      POSTGRES_USER: spokenarr
      POSTGRES_PASSWORD: spokenarrpass
      POSTGRES_DB: spokenarr
    volumes:
      - spokenarr_db_data:/var/lib/postgresql/data

  spokenarr-api:
    image: nate8727/spokenarr-api:latest
    depends_on:
      - spokenarr-db
    ports:
      - "5180:80"
    environment:
      - DATABASE_URL=postgresql://spokenarr:spokenarrpass@spokenarr-db:5432/spokenarr
    volumes:
      - spokenarr_data:/data
      - spokenarr_config:/app/config

  spokenarr-web:
    image: nate8727/spokenarr-web:latest
    depends_on:
      - spokenarr-api
    ports:
      - "3180:80"

volumes:
  spokenarr_db_data:
  spokenarr_data:
  spokenarr_config:
```

---

## ⚙️ Configuration

From the **WebUI → Settings**, set URLs for external services (Prowlarr, Deluge, NZBGet).
Default import path: `/data/downloads/completed`

---

## 🐋 CI/CD

GitHub Actions workflow included: `.github/workflows/docker-build.yml` (pushes to Docker Hub `nate8727/spokenarr`)

---

## License

MIT © 2025
