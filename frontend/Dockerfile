# syntax=docker/dockerfile:1.6

# ---------- Stage 1: Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev) for build
RUN npm ci --legacy-peer-deps

# ---------- Stage 2: Build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the frontend
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

# Optional: prune dev deps for smaller runtime image
RUN npm prune --production

# ---------- Stage 3: Serve ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
