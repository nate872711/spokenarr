# syntax=docker/dockerfile:1.6
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies for PostgreSQL
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for caching)
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose FastAPI port
EXPOSE 80

# Run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
