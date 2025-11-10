# syntax=docker/dockerfile:1.6

############################
# 1 — Build stage
############################
FROM node:18-alpine AS build
WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

############################
# 2 — Nginx runtime
############################
FROM nginx:1.25-alpine AS runtime

# Clean default html and copy our build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# Our nginx config (SPA + /api proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
