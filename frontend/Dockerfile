# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./

# Fail fast if no lockfile exists
RUN if [ ! -f package-lock.json ]; then \
      echo "❌ package-lock.json missing! Please commit it before building."; \
      exit 1; \
    fi

RUN npm ci --legacy-peer-deps

# ---------- Stage 2: build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Skip Storybook in CI builds
ARG SKIP_STORYBOOK=true
RUN if [ "$SKIP_STORYBOOK" = "true" ]; then \
      echo "Skipping Storybook build for CI..."; \
    else \
      npm run build-storybook -- --output-dir storybook-static; \
    fi

RUN npm run build

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
