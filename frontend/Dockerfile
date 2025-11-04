# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source files and build both app and Storybook
COPY . .
RUN npm run build || echo "Main build failed or skipped"
RUN npm run build-storybook -- --output-dir storybook-static || echo "Storybook build skipped"

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy build artifacts — try multiple possible output dirs for flexibility
COPY --from=build /app/build ./        # For CRA or Vite
COPY --from=build /app/dist ./         # For Vite or modern frameworks
COPY --from=build /app/out ./          # For Next.js
COPY --from=build /app/storybook-static ./storybook

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
