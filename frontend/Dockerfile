# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source files and build both the app and Storybook
COPY . .
RUN npm run build
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build skipped"

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy build artifacts from the previous stage
COPY --from=build /app/dist ./       # React or Vite build
COPY --from=build /app/storybook-static ./storybook  # Storybook (optional)

# Copy a custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
