# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency manifests and install packages
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy full source and build both apps
COPY . .
RUN npm run build || echo "Main build failed or skipped"
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build failed"

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Vite build output
COPY --from=build /app/dist ./    # Vite build directory
COPY --from=build /app/storybook-static ./storybook  # Storybook static output

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
