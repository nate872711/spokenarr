# Stage 1: Build frontend
FROM node:20-alpine AS deps
WORKDIR /app

# Install necessary build dependencies for gifsicle and similar packages
RUN apk add --no-cache python3 make g++ autoconf automake libtool bash git

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copy rest of frontend
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Nginx to serve static files
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy optimized Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=deps /app/dist ./

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
