# syntax=docker/dockerfile:1.6

# ---------- Stage 1: Dependencies ----------
FROM node:20-bullseye AS deps
WORKDIR /app

# Install OS dependencies for native modules like gifsicle/imagemin
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    autoconf \
    automake \
    libtool \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Clean npm cache and fix permissions for CI
RUN npm cache clean --force && mkdir -p /root/.npm && chmod -R 777 /root/.npm

# Install dependencies safely
RUN if [ -f package-lock.json ]; then \
      echo "✅ Found package-lock.json, running npm ci..."; \
      npm ci --legacy-peer-deps; \
    else \
      echo "⚠️ No package-lock.json found, running npm install..."; \
      npm install --legacy-peer-deps; \
    fi

# ---------- Stage 2: Build ----------
FROM node:20-bullseye AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Vite frontend
RUN echo "🚧 Building Vite app..." && npm run build

# ---------- Stage 3: Serve ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build files
COPY --from=build /app/dist ./

# Expose port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
