# syntax=docker/dockerfile:1.6

# ====================================================
# STAGE 1 — DEPENDENCIES (Cached)
# ====================================================
FROM node:20-alpine AS deps
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Detect and install dependencies intelligently
RUN if [ -f package-lock.json ]; then \
      echo "📦 Using npm ci (lockfile found)" && npm ci --legacy-peer-deps; \
    else \
      echo "⚙️ No lockfile found, running npm install..." && npm install --legacy-peer-deps; \
    fi

# ====================================================
# STAGE 2 — BUILD (Cached by source)
# ====================================================
FROM node:20-alpine AS build
WORKDIR /app

# Copy node_modules first (cached layer)
COPY --from=deps /app/node_modules ./node_modules

# Copy only source code (better cache granularity)
COPY . .

# Build optimized Vite + Storybook
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

# Optionally prune dev dependencies for smaller final image
RUN npm prune --production

# ====================================================
# STAGE 3 — RUNTIME (Nginx)
# ====================================================
FROM nginx:stable-alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend and storybook
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

# Expose port
EXPOSE 80

# Healthcheck (optional but useful for Docker Compose)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -q --spider http://localhost:80 || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
