# syntax=docker/dockerfile:1.6

FROM node:18 AS build

WORKDIR /app

# Copy only package.json first (best for caching)
COPY package.json ./

# Install dependencies WITHOUT requiring package-lock.json
RUN npm install --legacy-peer-deps

# Copy rest of project
COPY . .

# Build production assets
RUN npm run build

# Serve via nginx
FROM nginx:1.25-alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts to nginx
COPY --from=build /app/dist /usr/share/nginx/html/

# Copy custom nginx config (if you have one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
