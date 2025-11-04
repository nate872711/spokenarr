# --- Build stage ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Build both app and Storybook
RUN npm run build || echo "Vite build skipped or failed"
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build skipped or failed"

# --- Runtime stage ---
FROM nginx:stable-alpine AS runtime

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Vite build output
COPY --from=build /app/dist ./

# Copy Storybook output
COPY --from=build /app/storybook-static ./storybook

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
