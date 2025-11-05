# syntax=docker/dockerfile:1.6

# ---------- Stage 1: dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./

# ✅ Generate lockfile if missing
RUN if [ ! -f package-lock.json ]; then \
      echo "⚙️  No package-lock.json found — generating temporary one..." && \
      npm set progress=false && \
      npm install --package-lock-only --ignore-scripts --legacy-peer-deps; \
    else \
      echo "✅ Found existing package-lock.json — using npm ci"; \
    fi

# Install dependencies (prefer npm ci for reproducibility)
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# ---------- Stage 2: build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Optional Storybook build
ARG SKIP_STORYBOOK=true
RUN if [ "$SKIP_STORYBOOK" = "true" ]; then \
      echo "Skipping Storybook build for CI..."; \
    else \
      npm run build-storybook -- --output-dir storybook-static; \
    fi

# Build main frontend app
RUN npm run build || (echo "❌ Frontend build failed. Check your build script."; exit 1)

# ---------- Stage 3: serve ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🧩 Copy whichever build output exists (Vite or CRA)
RUN mkdir -p /tmp/build
COPY --from=build /app/dist /tmp/build 2>/dev/null || true
COPY --from=build /app/build /tmp/build 2>/dev/null || true

# ❌ Fail clearly if nothing built
RUN if [ ! "$(ls -A /tmp/build)" ]; then \
      echo "❌ No frontend build output found (dist/ or build/ missing). Did npm run build fail?"; \
      exit 1; \
    fi

COPY --from=build /tmp/build /usr/share/nginx/html

# Optional Storybook output (only if built)
COPY --from=build /app/storybook-static /usr/share/nginx/html/storybook 2>/dev/null || true

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
