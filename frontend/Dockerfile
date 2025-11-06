# ----------------------------------------------------
# FRONTEND DOCKERFILE — Stable Multi-Arch Build
# ----------------------------------------------------
FROM node:20-slim AS deps

# Install required tools for image optimization fallback
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential python3 git curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only package manifests first (for better caching)
COPY package*.json ./

# ✅ Fix: prevent optipng-bin from trying to build from source
# by skipping optional dependencies on unsupported archs
ENV npm_config_optional=true
ENV npm_config_arch=x64

# Install dependencies (using ci if lockfile exists)
RUN if [ -f package-lock.json ]; then \
      echo "✅ Found package-lock.json, running npm ci..."; \
      npm ci --legacy-peer-deps; \
    else \
      echo "⚠️ No package-lock.json found, running npm install..."; \
      npm install --legacy-peer-deps; \
    fi

# ----------------------------------------------------
# Build stage
# ----------------------------------------------------
FROM node:20-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ----------------------------------------------------
# Runtime stage
# ----------------------------------------------------
FROM nginx:stable-alpine AS runtime

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
