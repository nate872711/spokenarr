# syntax=docker/dockerfile:1.6

# ================================
# ⚙️ STAGE 1: Build (Vite + Node)
# ================================
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Ensure deterministic dependency installs
RUN if [ ! -f package-lock.json ]; then \
      echo "⚠️ No package-lock.json found — generating one..." && \
      npm install --package-lock-only --legacy-peer-deps; \
    fi && \
    npm ci --legacy-peer-deps

# Copy project files
COPY . .

# Run Vite production build
RUN npm run build

# Also build Storybook (optional)
RUN npm run build-storybook -- --output-dir storybook-static

# ================================
# 🌐 STAGE 2: Serve with Nginx
# ================================
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=build /app/dist ./         # Vite build output
COPY --from=build /app/storybook-static ./storybook

# Include favicon and spinner (optional assets)
COPY --from=build /app/public/favicon.ico ./favicon.ico
COPY --from=build /app/public/spinner.png ./spinner.png

# Performance & security headers can be managed in nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
