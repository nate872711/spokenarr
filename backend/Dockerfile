# syntax=docker/dockerfile:1.6

# ---------- Stage 1: base ----------
FROM python:3.11-slim AS base
WORKDIR /app

# Install system dependencies (for psycopg2, Pillow, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/*

# ---------- Stage 2: dependencies ----------
FROM base AS deps
WORKDIR /app

# Copy dependency definitions
COPY requirements.txt .

# ✅ Robust pip configuration for retries & mirror fallback
RUN pip install --upgrade pip setuptools wheel && \
    pip config set global.timeout 100 && \
    pip config set global.retries 5 && \
    pip config set install.trusted-host pypi.org && \
    pip config set install.trusted-host pypi.python.org && \
    pip config set install.trusted-host files.pythonhosted.org && \
    pip install -r requirements.txt || \
    (echo "⚠️ PyPI install failed — retrying with mirror..." && \
     pip install -r requirements.txt --index-url https://pypi.org/simple --extra-index-url https://pypi.tuna.tsinghua.edu.cn/simple)

# ---------- Stage 3: application ----------
FROM base AS runtime
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=deps /usr/local/bin /usr/local/bin

# Copy app source
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# ✅ Expose API port
EXPOSE 8000

# Health check for container monitoring
HEALTHCHECK CMD curl --fail http://localhost:8000/api/health || exit 1

# Run the FastAPI app via Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
