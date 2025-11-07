# ------------------------------
# Stage 1: Dependencies
# ------------------------------
FROM node:20-slim AS deps

WORKDIR /app

# Install build dependencies required for gifsicle/optipng/jpegtran binaries
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      autoconf \
      automake \
      libtool \
      make \
      g++ \
      ca-certificates \
      python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy package manifests
COPY package*.json ./

# Install npm dependencies
RUN echo "📦 Installing dependencies..." && \
    if [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --package-lock-only --legacy-peer-deps && \
      npm install --legacy-peer-deps; \
    fi

# ------------------------------
# Stage 2: Build
# ------------------------------
FROM node:20-slim AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Vite app
RUN echo "🚀 Building production frontend..." && \
    npm run build || (echo "❌ Build failed" && exit 1)

# ------------------------------
# Stage 3: Production Image
# ------------------------------
FROM nginx:alpine AS runtime

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Set up non-root user and permissions
RUN adduser -D -H -u 1001 spokenarr && \
    chown -R spokenarr:spokenarr /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

USER spokenarr
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
