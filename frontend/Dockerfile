# Stage 1: Build Storybook
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the app source
COPY . .

# Build Storybook output
RUN npx storybook build -o storybook-static

# Verify that the build succeeded
RUN echo "Storybook build complete" && ls -la storybook-static

# Stage 2: Serve via Nginx
FROM nginx:stable-alpine
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
