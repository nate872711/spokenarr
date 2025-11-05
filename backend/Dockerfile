# ---------- Stage 1: Build Environment ----------
FROM python:3.11-slim AS build

WORKDIR /app

# Install dependencies first (for Docker cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source
COPY ./app /app/app

# ---------- Stage 2: Runtime ----------
FROM python:3.11-slim

WORKDIR /app
ENV PYTHONUNBUFFERED=1

# Copy installed deps and app from build stage
COPY --from=build /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=build /app /app

# ---------- Ensure DB initialized ----------
# Run init_db() before FastAPI launches
# This step prevents startup errors on a fresh PostgreSQL volume
CMD python -c "from app import db; db.init_db();" && \
    uvicorn app.main:app --host 0.0.0.0 --port 80
