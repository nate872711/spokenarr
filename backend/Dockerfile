# syntax=docker/dockerfile:1.6

FROM python:3.11-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Create non-root user (optional but good practice)
RUN useradd -u 10001 -m appuser

WORKDIR /app

# System deps kept minimal (no gcc/libpq needed because we use psycopg[binary])
RUN apt-get update && apt-get install -y --no-install-recommends \
      tini \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python deps first for better layer cache
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy app source
COPY app ./app

# Expose HTTP port
EXPOSE 80

# Use tini as entrypoint for clean signal handling
ENTRYPOINT ["/usr/bin/tini", "--"]

# Run uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
