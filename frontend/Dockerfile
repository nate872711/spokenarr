# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package definitions
COPY package*.json ./

# If no lockfile exists, generate one automatically
RUN if [ ! -f package-lock.json ]; then \
      echo "No package-lock.json found. Generating one..." && \
      npm install --package-lock-only --legacy-peer-deps; \
    fi

# Install dependencies with cache
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# ---------- Stage 2: build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
