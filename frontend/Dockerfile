# syntax=docker/dockerfile:1.6

########################
# Stage 1: Dependencies
########################
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Generate a lockfile if it doesn't exist (for first-time setups)
RUN if [ ! -f package-lock.json ]; then \
      echo "No package-lock.json found. Generating one..." && \
      npm install --package-lock-only --legacy-peer-deps; \
    fi

# Install dependencies with caching
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps


########################
# Stage 2: Build React app
########################
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the production bundles
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static


########################
# Stage 3: Serve via Nginx
########################
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app and Storybook files
COPY --from=build /app/dist .
COPY --from=build /app/storybook-static ./storybook

# Add static assets (favicon, spinner)
COPY --from=build /app/src/assets/favicon.ico /usr/share/nginx/html/
COPY --from=build /app/src/assets/spinner.png /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
