# ---------- STAGE 1: BUILD ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Build main Vite app and Storybook
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static

# ---------- STAGE 2: SERVE ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove the default Nginx content completely
RUN rm -rf ./*

# Copy the built frontend and Storybook output
COPY --from=build /app/dist ./
COPY --from=build /app/storybook-static ./storybook

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
