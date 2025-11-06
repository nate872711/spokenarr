# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Install required system build tools for image optimization libs (like gifsicle)
RUN apk add --no-cache python3 make g++ autoconf automake libtool bash git

# Copy package definition files
COPY package*.json ./

# Clean npm cache and fix permissions for CI environments
RUN npm cache clean --force && mkdir -p /root/.npm && chmod -R 777 /root/.npm

# Install dependencies safely
RUN if [ -f package-lock.json ]; then \
      echo "✅ Found package-lock.json, running npm ci..."; \
      npm ci --legacy-peer-deps; \
    else \
      echo "⚠️ No package-lock.json found, running npm install..."; \
      npm install --legacy-peer-deps; \
    fi

# ---------- Stage 2: build ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run the build with clear logs
RUN echo "🧱 Building Vite app..." && npm run build

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=build /app/dist ./

# Expose port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
