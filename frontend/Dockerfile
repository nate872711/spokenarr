# ===============================
# 🧱 Stage 1: Dependencies
# ===============================
FROM node:20-slim AS deps

WORKDIR /app

# Install required build tools for imagemin and patch-package
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      autoconf \
      automake \
      build-essential \
      libtool \
      make \
      g++ \
      pkg-config \
      nasm \
      libpng-dev \
      zlib1g-dev \
      libjpeg-dev \
      libgif-dev \
      ca-certificates \
      python3 && \
    rm -rf /var/lib/apt/lists/*

# Fix ARM64 issues with optipng (disable NEON optimizations)
ENV CFLAGS="-O2 -fPIC -DPNG_ARM_NEON_OPT=0 -DPNG_ARM_NEON=0" \
    CPPFLAGS="-O2 -fPIC -DPNG_ARM_NEON_OPT=0 -DPNG_ARM_NEON=0" \
    LDFLAGS="-lm"

COPY package*.json ./

# Ensure patch-package works (install globally or ensure it’s available before npm ci)
RUN npm install -g patch-package && \
    echo "📦 Installing dependencies..." && \
    if [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --package-lock-only --legacy-peer-deps && \
      npm install --legacy-peer-deps; \
    fi && \
    echo "✅ Applying local patches..." && \
    npx patch-package || echo "ℹ️ No patches to apply"

# ===============================
# ⚙️ Stage 2: Build
# ===============================
FROM node:20-slim AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN echo "🚀 Building app..." && \
    npm run build || (echo "❌ Build failed" && exit 1)

# ===============================
# 🌐 Stage 3: Runtime
# ===============================
FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

RUN adduser -D -H -u 1001 spokenarr && \
    chown -R spokenarr:spokenarr /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

USER spokenarr
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
