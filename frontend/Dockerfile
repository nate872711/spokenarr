# Stage 1: Build the frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files and install first for caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source files except storybook and .stories files
# The .dockerignore file will also help exclude them
COPY . .

# Remove Storybook-related files to prevent them from being bundled in production
RUN find . -type f \( -name "*.stories.*" -o -name "preview.*" -o -name "main.*" \) -delete || true
RUN rm -rf .storybook stories || true

# Build the main app only (no storybook in production)
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files to Nginx web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
