# syntax=docker/dockerfile:1.6

FROM python:3.11-slim AS base

# Set environment vars
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=off
ENV PIP_DISABLE_PIP_VERSION_CHECK=on
ENV PATH="/root/.local/bin:$PATH"

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy project files
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install fastapi uvicorn sqlalchemy asyncpg psycopg2-binary databases python-multipart

# Create necessary folders for runtime
RUN mkdir -p /app/logs /app/audio && \
    chmod -R 755 /app/logs /app/audio

# Expose API port
EXPOSE 80

# Run API with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
