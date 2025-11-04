# Stage 1: Build the frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files and install first for caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend code (this is the fix)
COPY . .

# Build both the main app and Storybook
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

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
