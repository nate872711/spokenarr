# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Build both the main app and Storybook
RUN npm run build || echo "Main build failed or skipped"
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build failed"

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled frontend from the build stage
COPY --from=build /app/dist ./        # For Vite builds
COPY --from=build /app/build ./       # For React builds

# Copy Storybook static output (optional)
COPY --from=build /app/storybook-static ./storybook

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
