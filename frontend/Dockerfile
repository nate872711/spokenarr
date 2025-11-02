# Stage 1: Build Storybook
FROM node:20 AS build
WORKDIR /app

# Copy all files so Storybook can access configs
COPY . .

# Install all dependencies
RUN npm install --legacy-peer-deps

# Build the Storybook static site
RUN npx storybook build -o storybook-static

# Stage 2: Serve via Nginx
FROM nginx:alpine
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 6006
CMD ["nginx", "-g", "daemon off;"]
