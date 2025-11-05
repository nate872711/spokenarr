FROM python:3.11-slim

WORKDIR /app
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /app/app

# Run database initialization & seed before starting FastAPI
CMD python -c "from app import db; db.init_db();" && \
    uvicorn app.main:app --host 0.0.0.0 --port 80
