# syntax=docker/dockerfile:1.6

##############################################
# Stage 1 — Dependencies (cached layer)
##############################################
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package definitions
COPY package*.json ./

# Auto-generate lockfile if missing
RUN if [ ! -f package-lock.json ]; then \
      echo "No package-lock.json found. Generating one..." && \
      npm install --package-lock-only --legacy-peer-deps; \
    fi

# Install dependencies (cached for faster builds)
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

##############################################
# Stage 2 — Build the app
##############################################
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Vite + Storybook builds
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

##############################################
# Stage 3 — Runtime (Nginx)
##############################################
FROM nginx:stable-alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend and Storybook output
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

# Ensure correct permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose container port
EXPOSE 80

# Launch nginx
CMD ["nginx", "-g", "daemon off;"]
