# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./

# ✅ If no package-lock.json exists, auto-generate one (fast and safe)
RUN if [ ! -f package-lock.json ]; then \
      echo "⚙️  No package-lock.json found — generating temporary one..." && \
      npm set progress=false && \
      npm install --package-lock-only --ignore-scripts --legacy-peer-deps; \
    else \
      echo "✅ Found existing package-lock.json — using npm ci"; \
    fi

RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# ---------- Stage 2: build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Optional Storybook build (can be skipped for CI)
ARG SKIP_STORYBOOK=true
RUN if [ "$SKIP_STORYBOOK" = "true" ]; then \
      echo "Skipping Storybook build for CI..."; \
    else \
      npm run build-storybook -- --output-dir storybook-static; \
    fi

RUN npm run build

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Optional Storybook output (only if built)
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook 2>/dev/null || true

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
