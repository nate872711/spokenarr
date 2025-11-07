# syntax=docker/dockerfile:1.6

# ---------- Stage 1: base ----------
FROM --platform=$BUILDPLATFORM python:3.11-slim AS base
WORKDIR /app

# Install minimal system deps for psycopg2, Pillow, etc.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev curl gcc \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# ---------- Stage 2: deps ----------
FROM base AS deps
WORKDIR /app
COPY requirements.txt .

# Install dependencies with retry and mirror fallback
RUN pip install --upgrade pip setuptools wheel && \
    pip config set global.timeout 100 && \
    pip config set global.retries 5 && \
    pip config set install.trusted-host pypi.org && \
    pip config set install.trusted-host pypi.python.org && \
    pip config set install.trusted-host files.pythonhosted.org && \
    pip install -r requirements.txt || \
    (echo "⚠️ PyPI install failed — retrying with mirror..." && \
     pip install -r requirements.txt --index-url https://pypi.org/simple --extra-index-url https://pypi.tuna.tsinghua.edu.cn/simple)

# ---------- Stage 3: runtime ----------
FROM --platform=$TARGETPLATFORM python:3.11-slim AS runtime
WORKDIR /app

# Copy deps from build stage
COPY --from=deps /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=deps /usr/local/bin /usr/local/bin

# Copy the app
COPY . .

# Create non-root user for security
RUN useradd -m appuser
USER appuser

EXPOSE 8000

# Health check for container monitoring
HEALTHCHECK --interval=15s --timeout=5s --retries=3 \
  CMD curl --fail http://localhost:8000/api/health || exit 1

# Run FastAPI app with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "info"]
