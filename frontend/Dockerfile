# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-slim AS deps
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Optional build argument to skip imagemin (for faster CI builds)
ARG SKIP_IMAGEMIN=false
ENV SKIP_IMAGEMIN=${SKIP_IMAGEMIN}

# Install dependencies
RUN if [ -f package-lock.json ]; then \
      echo "✅ Found package-lock.json, running npm ci..."; \
      npm ci --legacy-peer-deps; \
    else \
      echo "⚠️  No package-lock.json found, running npm install..."; \
      npm install --package-lock-only --legacy-peer-deps && \
      npm install --legacy-peer-deps; \
    fi

# ---------- Stage 2: build ----------
FROM node:20-slim AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for versioning and optional optimization
ARG VITE_APP_VERSION=dev
ARG SKIP_IMAGEMIN=false
ENV VITE_APP_VERSION=${VITE_APP_VERSION}
ENV SKIP_IMAGEMIN=${SKIP_IMAGEMIN}

# Run Vite build
RUN echo "🏗️ Building Spokenarr (version $VITE_APP_VERSION, SKIP_IMAGEMIN=$SKIP_IMAGEMIN)" && \
    npm run build && \
    npm run build-storybook -- --output-dir storybook-static || echo "⚠️ Skipping Storybook build"

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy app build output
COPY --from=build /app/dist ./dist
COPY --from=build /app/storybook-static ./storybook

# Default port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
