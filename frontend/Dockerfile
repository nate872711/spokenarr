# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code and build both app and storybook
COPY . .
RUN npm run build || echo "Main build failed or skipped"
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build failed"

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy main web app build output (Vite/CRA)
# Adjust this line depending on your frontend framework
COPY --from=build /app/dist ./  # For Vite
# COPY --from=build /app/build ./  # Uncomment this line instead if it’s React CRA

# Copy Storybook to a subpath
COPY --from=build /app/storybook-static ./storybook

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
