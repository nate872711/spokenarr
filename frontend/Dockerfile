# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Generate lockfile if missing
RUN if [ ! -f package-lock.json ]; then \
      echo "Generating package-lock.json..." && \
      npm install --package-lock-only --legacy-peer-deps; \
    fi

# Install dependencies with caching
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# ---------- Stage 2: build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy node_modules and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ✅ Ensure assets exist before build to prevent Vite failures
RUN mkdir -p src/assets && \
    if [ ! -f src/assets/favicon.ico ]; then echo "⚠️ Adding fallback favicon"; echo -n "" > src/assets/favicon.ico; fi && \
    if [ ! -f src/assets/spinner.png ]; then echo "⚠️ Adding fallback spinner"; echo -n "" > src/assets/spinner.png; fi

# Build frontend + storybook
RUN npm run build && npm run build-storybook -- --output-dir storybook-static

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine

# Copy our nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled app and Storybook output
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

# Copy critical assets directly to HTML root
COPY --from=build /app/src/assets/favicon.ico /usr/share/nginx/html/favicon.ico
COPY --from=build /app/src/assets/spinner.png /usr/share/nginx/html/assets/spinner.png

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
