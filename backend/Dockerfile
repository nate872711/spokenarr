# syntax=docker/dockerfile:1.6

# ----------------------------------------
# Base image
# ----------------------------------------
FROM python:3.11-slim AS base
WORKDIR /app

# System packages for psycopg/asyncpg and friends
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev curl gcc \
 && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# ----------------------------------------
# Dependencies (build per-arch, no cross-copy!)
# ----------------------------------------
FROM base AS deps

COPY requirements.txt .
RUN pip install --upgrade pip setuptools wheel && \
    pip config set global.timeout 100 && \
    pip config set global.retries 5 && \
    pip install --no-cache-dir -r requirements.txt

# ----------------------------------------
# Runtime
# ----------------------------------------
FROM python:3.11-slim AS runtime
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev curl \
 && rm -rf /var/lib/apt/lists/*

# Copy installed site-packages and binaries
COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin

# App code
COPY . .

EXPOSE 8000

HEALTHCHECK CMD curl --fail http://localhost:8000/api/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
