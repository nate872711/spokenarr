# ------------------------------
# Stage 1: Dependencies
# ------------------------------
FROM node:20-slim AS deps

WORKDIR /app

# Install build dependencies required by imagemin plugins (gifsicle, mozjpeg, optipng)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      autoconf \
      automake \
      libtool \
      make \
      g++ \
      pkg-config \
      nasm \
      libpng-dev \
      zlib1g-dev \
      ca-certificates \
      python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy package manifests
COPY package*.json ./

# Install dependencies
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

RUN echo "🚀 Building Vite app..." && \
    npm run build || (echo "❌ Build failed" && exit 1)

# ------------------------------
# Stage 3: Production Image
# ------------------------------
FROM nginx:alpine AS runtime

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Security: run as non-root
RUN adduser -D -H -u 1001 spokenarr && \
    chown -R spokenarr:spokenarr /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

USER spokenarr
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
