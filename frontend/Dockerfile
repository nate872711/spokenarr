# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package definitions
COPY package*.json ./

# Install dependencies (generate lockfile if missing)
RUN if [ -f package-lock.json ]; then \
      echo "✅ Found package-lock.json, running npm ci..."; \
      npm ci --legacy-peer-deps; \
    else \
      echo "⚠️  No package-lock.json found, running npm install..."; \
      npm install --package-lock-only --legacy-peer-deps && \
      npm install --legacy-peer-deps; \
    fi

# ---------- Stage 2: build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Vite app & Storybook
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
