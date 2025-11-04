# Stage 1: Build the frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files and install first (cache dependencies)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source files after dependencies
COPY ./ ./

# Build Vite app
RUN npm run build

# Build Storybook (optional, not required for runtime)
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build skipped"

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Clear any existing files in the default Nginx folder
RUN rm -rf /usr/share/nginx/html/*

# Copy your build output into Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
