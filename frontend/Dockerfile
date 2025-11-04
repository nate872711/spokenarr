# Stage 1: Build the frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Use npm ci if a lockfile exists, otherwise fallback to npm install
RUN if [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --legacy-peer-deps; \
    fi

# Copy the rest of the app source
COPY . .

# Rebuild vite and esbuild for Alpine compatibility
RUN npm rebuild esbuild && npm rebuild vite || true

# Build the main frontend and Storybook separately
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

# Stage 2: Serve via Nginx
FROM nginx:stable-alpine

# Custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build outputs
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
