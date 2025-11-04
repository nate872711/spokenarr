# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all files and build
COPY . .
RUN npm run build || echo "Main build failed or skipped"
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build failed"

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy both possible build folders (Vite or CRA)
COPY --from=build /app/dist ./ 2>/dev/null || true
COPY --from=build /app/build ./ 2>/dev/null || true

# Copy Storybook
COPY --from=build /app/storybook-static ./storybook

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
