# syntax=docker/dockerfile:1.6

################################################
# Stage 1 — Build Vite frontend
################################################
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

################################################
# Stage 2 — Nginx runtime
################################################
FROM nginx:alpine AS runtime

# Clean default config
RUN rm -rf /usr/share/nginx/html/*

# Copy built Vite app
COPY --from=build /app/dist /usr/share/nginx/html

# Copy your custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
