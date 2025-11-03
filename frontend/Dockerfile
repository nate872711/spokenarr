# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependencies first for caching
COPY package*.json ./

# Always install ALL dependencies (including devDeps for Storybook)
ENV NODE_ENV=development
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Build Storybook first (for debugging, prints log if failure)
RUN npx storybook build -o storybook-static || echo "⚠️ Storybook build skipped due to story validation errors"

# Build main Vite app
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy built files from previous stage
COPY --from=build /app/dist ./              # main web app
COPY --from=build /app/storybook-static ./storybook  # Storybook static site

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
