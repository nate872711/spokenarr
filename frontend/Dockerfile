# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build || echo "Main build failed or skipped"
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build failed"

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Vite or React build output dynamically
RUN mkdir -p /tmp/build && \
    if [ -d /app/dist ]; then cp -r /app/dist/* /usr/share/nginx/html/; \
    elif [ -d /app/build ]; then cp -r /app/build/* /usr/share/nginx/html/; \
    fi

# Copy Storybook (optional)
COPY --from=build /app/storybook-static ./storybook

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
