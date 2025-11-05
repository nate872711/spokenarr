# syntax=docker/dockerfile:1.6

# ---------- Base image ----------
FROM python:3.11-slim AS base
WORKDIR /app

# ---------- System dependencies ----------
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ---------- Copy and install dependencies ----------
COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ---------- Copy source code ----------
COPY . .

# ---------- Environment setup ----------
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# ---------- Expose FastAPI port ----------
EXPOSE 8000

# ---------- Start FastAPI ----------
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
