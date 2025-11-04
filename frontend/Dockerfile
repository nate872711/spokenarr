# Stage 1: Build the frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files and install first for caching
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy the rest of the frontend code
COPY . .

# Ensure vite & esbuild exist
RUN npm rebuild esbuild && npm rebuild vite || true

# Build the main app only (no Storybook in production)
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend and Storybook
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
