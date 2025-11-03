# Stage 1: build Storybook
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build Storybook static files
RUN npx storybook build -o storybook-static

# Stage 2: serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
