# Stage 1: Build Storybook
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build-storybook

# Stage 2: Serve Storybook with a lightweight web server
FROM nginx:alpine
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 6006
CMD ["nginx", "-g", "daemon off;"]
