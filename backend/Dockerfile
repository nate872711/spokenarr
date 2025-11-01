FROM python:3.11-slim

WORKDIR /app
COPY ./app /app/app
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt
RUN pip install psycopg2-binary &&
    superset db upgrade &&
    superset init &&
    gunicorn -w 2 --timeout 60 -b 0.0.0.0:8088 'superset.app:create_app()'

ENV SETTINGS_PATH=/app/config/settings.json
EXPOSE 80
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"] 
