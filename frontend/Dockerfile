# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package definitions
COPY package*.json ./

# ✅ Primary install with caching
# If the main npm registry fails or a package is missing, it retries via Yarn mirror
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-factor 3 && \
    npm config set fetch-retry-mintimeout 2000 && \
    npm config set fetch-retry-maxtimeout 10000 && \
    npm ci --legacy-peer-deps || \
    (echo "⚠️ NPM install failed — retrying with Yarn mirror..." && \
     npm config set registry https://registry.yarnpkg.com && \
     npm ci --legacy-peer-deps)

# ---------- Stage 2: build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ✅ Build frontend (Vite + Storybook)
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
