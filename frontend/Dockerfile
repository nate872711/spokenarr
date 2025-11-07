# ------------------------------
# Stage 1: Dependencies
# ------------------------------
FROM node:20-slim AS deps

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN echo "📦 Installing dependencies..." && \
    if [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --package-lock-only --legacy-peer-deps && \
      npm install --legacy-peer-deps; \
    fi

# ------------------------------
# Stage 2: Build
# ------------------------------
FROM node:20-slim AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the frontend using Vite
RUN echo "🚀 Building production frontend..." && \
    npm run build || (echo "❌ Build failed" && exit 1)

# ------------------------------
# Stage 3: Production Image
# ------------------------------
FROM nginx:alpine AS runtime

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# (Removed Storybook copy line that caused checksum error)
# COPY --from=build /app/storybook-static ./storybook

# Optimize Nginx permissions and startup
RUN adduser -D -H -u 1001 spokenarr && \
    chown -R spokenarr:spokenarr /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

USER spokenarr

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
