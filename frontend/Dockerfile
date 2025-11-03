# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies with proper peer handling
RUN npm ci --legacy-peer-deps

# Copy the rest of the project
COPY . .

# Build Storybook and the production app
RUN npm run build-storybook -- --output-dir storybook-static
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy built files from build stage
COPY --from=build /app/dist ./        # your main Vite build output
COPY --from=build /app/storybook-static ./storybook

# Copy nginx config if you have one
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
