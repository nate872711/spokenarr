# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package definitions
COPY package*.json ./

# ✅ Always perform a clean dependency install (safe for CI/CD)
RUN npm install --legacy-peer-deps

# ---------- Stage 2: build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ✅ Build the main app and Storybook
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook

# ✅ Performance and caching optimizations
RUN adduser -D -g 'www' www \
  && chown -R www:www /usr/share/nginx/html \
  && chmod -R 755 /usr/share/nginx/html

EXPOSE 80
USER www

CMD ["nginx", "-g", "daemon off;"]
