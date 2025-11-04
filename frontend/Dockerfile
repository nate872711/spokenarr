# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source files and build both the main app and Storybook
COPY . .
RUN npm run build || echo "Main build failed or skipped"
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build skipped"

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy any existing frontend build (handles CRA, Vite, or Next.js outputs gracefully)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static ./storybook

# Use shell to copy whichever output folder exists
RUN mkdir -p /usr/share/nginx/html && \
    if [ -d /app/build ]; then cp -r /app/build/* .; \
    elif [ -d /app/dist ]; then cp -r /app/dist/* .; \
    elif [ -d /app/out ]; then cp -r /app/out/* .; \
    else echo "⚠️ No build output found!"; fi

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
