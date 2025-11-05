# syntax=docker/dockerfile:1.6

##################################
# Stage 1: Build dependencies
##################################
FROM --platform=$BUILDPLATFORM python:3.11-slim AS builder
WORKDIR /app

# Install build tools safely for both archs
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc g++ libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY requirements.txt ./

# Precompile dependencies into wheels
RUN pip install --upgrade pip setuptools wheel && \
    pip wheel --no-cache-dir --wheel-dir /app/wheels -r requirements.txt


##################################
# Stage 2: Final runtime
##################################
FROM python:3.11-slim
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy prebuilt wheels and install
COPY --from=builder /app/wheels /wheels
RUN pip install --no-cache-dir /wheels/*

# Copy application code
COPY . .

# Expose API port
EXPOSE 8000

# Run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
