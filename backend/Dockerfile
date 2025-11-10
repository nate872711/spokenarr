# syntax=docker/dockerfile:1.6

# ----------------------------------------
# Base image
# ----------------------------------------
FROM python:3.11-slim AS base
WORKDIR /app

# Install system packages needed for dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    gcc \
 && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# ----------------------------------------
# Dependencies layer (NO copying between arch!)
# ----------------------------------------
FROM base AS deps

COPY requirements.txt .

# Safe pip setup with retries
RUN pip install --upgrade pip setuptools wheel && \
    pip config set global.timeout 100 && \
    pip config set global.retries 5 && \
    pip install --no-cache-dir -r requirements.txt

# ----------------------------------------
# Runtime image (ARM64/AMD64-safe)
# ----------------------------------------
FROM python:3.11-slim AS runtime
WORKDIR /app

# Install system libs — same list as base or pared down
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

# Copy installed site-packages from deps stage
COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin

# Copy application source
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Healthcheck
HEALTHCHECK CMD curl --fail http://localhost:8000/api/health || exit 1

# Start API server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
