# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependencies first for caching
COPY package*.json ./

# Install dependencies with correct peer handling
RUN npm install --legacy-peer-deps

# Copy all frontend source
COPY . .

# Build Storybook first, then main app
# This ensures both directories exist before copying to nginx
RUN npm run build-storybook -- --output-dir storybook-static || (echo "Storybook build failed" && cat /root/.npm/_logs/*-debug-0.log && exit 1)
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy main web app and Storybook output
COPY --from=build /app/dist ./         # your main Vite build
COPY --from=build /app/storybook-static ./storybook

# Optional: if you have a custom nginx config, uncomment and adjust
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
