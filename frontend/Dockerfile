# syntax=docker/dockerfile:1.6

# ---------- Stage 1: Dependencies ----------
FROM node:20-bullseye AS deps
WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Use cached clean install
RUN echo "📦 Installing dependencies..." && \
    if [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --package-lock-only --legacy-peer-deps && \
      npm install --legacy-peer-deps; \
    fi

# ---------- Stage 2: Build ----------
FROM node:20-bullseye AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG VITE_APP_VERSION="dev"
ARG SKIP_IMAGEMIN="false"

RUN echo "🏗️ Building Spokenarr (version $VITE_APP_VERSION, SKIP_IMAGEMIN=$SKIP_IMAGEMIN)" && \
    npm run build --if-present || echo "⚠️ Skipping Vite build (no build script found)" && \
    npm run build-storybook --if-present -- --output-dir storybook-static || echo "⚠️ Skipping Storybook build"

# ---------- Stage 3: Serve with Nginx ----------
FROM nginx:stable
WORKDIR /usr/share/nginx/html

# Copy built assets
COPY --from=build /app/dist ./dist
COPY --from=build /app/storybook-static ./storybook 2>/dev/null || true

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Entrypoint
CMD ["nginx", "-g", "daemon off;"]
