# ================================
# 🔧 STAGE 1: Build Frontend (Node)
# ================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependencies first for better caching
COPY package.json package-lock.json* ./

# Install dependencies (force lockfile if missing)
RUN if [ ! -f package-lock.json ]; then \
      echo "⚠️ No package-lock.json found — generating one..." && \
      npm install --package-lock-only --legacy-peer-deps; \
    fi && \
    npm ci --legacy-peer-deps

# Copy source files
COPY . .

# Build frontend (React / Vite / Next — autodetect)
RUN npm run build

# ================================
# 🧱 STAGE 2: Nginx Static Serve
# ================================
FROM nginx:1.27-alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy favicon and spinner (if present)
COPY --from=build /app/public/favicon.ico /usr/share/nginx/html/favicon.ico
COPY --from=build /app/public/spinner.png /usr/share/nginx/html/spinner.png

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
