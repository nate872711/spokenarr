# syntax=docker/dockerfile:1.6

# ============================
# Stage 1: Dependencies
# ============================
FROM node:20-slim AS deps
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies efficiently
RUN if [ -f package-lock.json ]; then \
      echo "✅ Found package-lock.json, installing exact deps..."; \
      npm ci --legacy-peer-deps; \
    else \
      echo "⚠️ No lockfile found, installing normally..."; \
      npm install --legacy-peer-deps; \
    fi

# ============================
# Stage 2: Build
# ============================
FROM node:20-slim AS build
WORKDIR /app

# Build arguments (from workflow)
ARG SKIP_IMAGEMIN=false
ENV SKIP_IMAGEMIN=${SKIP_IMAGEMIN}

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build frontend & storybook
RUN echo "🧱 Building Vite app (SKIP_IMAGEMIN=$SKIP_IMAGEMIN)..."
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

# ============================
# Stage 3: Serve with NGINX
# ============================
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy built frontend and storybook
COPY --from=build /app/dist ./
COPY --from=build /app/storybook-static ./storybook

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
