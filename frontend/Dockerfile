# syntax=docker/dockerfile:1.6

############################
# 1 — Build stage
############################
FROM node:18-alpine AS build

WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy source
COPY . .

# Build for production
RUN npm run build


############################
# 2 — Nginx runtime
############################
FROM nginx:1.25-alpine AS runtime

# Remove default HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled app
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (this is required)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
