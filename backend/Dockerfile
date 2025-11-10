# syntax=docker/dockerfile:1.6

###############################################
# Base image (arch-safe)
###############################################
FROM python:3.11-slim AS base
WORKDIR /app

# Install minimal runtime libs (NOT build tools)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

###############################################
# Dependency install (pure Python / binary wheels only)
###############################################
FROM base AS deps

COPY requirements.txt .

# Install dependencies — no build-essential, no libpq-dev, no GCC
RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

###############################################
# Final runtime image
###############################################
FROM python:3.11-slim AS runtime
WORKDIR /app

# Runtime libs only
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies
COPY --from=deps /usr/local/lib/python3.11/site-packages \
                 /usr/local/lib/python3.11/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin

# App source
COPY . .

EXPOSE 8000

HEALTHCHECK CMD curl --fail http://localhost:8000/api/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
