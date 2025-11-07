# ===============================
# 🧱 Stage 1: Dependencies
# ===============================
FROM node:20-slim AS deps

WORKDIR /app

# Install required build tools for imagemin libraries (mozjpeg, gifsicle, optipng)
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

# Fix for ARM64: disable NEON optimizations in libpng (prevents optipng linker errors)
ENV CFLAGS="-O2 -fPIC -DPNG_ARM_NEON_OPT=0 -DPNG_ARM_NEON=0" \
    CPPFLAGS="-O2 -fPIC -DPNG_ARM_NEON_OPT=0 -DPNG_ARM_NEON=0" \
    LDFLAGS="-lm"

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN echo "📦 Installing dependencies..." && \
    if [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --package-lock-only --legacy-peer-deps && \
      npm install --legacy-peer-deps; \
    fi

# ===============================
# ⚙️ Stage 2: Build
# ===============================
FROM node:20-slim AS build

WORKDIR /app

# Copy node_modules from deps and app source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app (Vite, Next.js, etc.)
RUN echo "🚀 Building app..." && \
    npm run build || (echo "❌ Build failed" && exit 1)

# ===============================
# 🌐 Stage 3: Runtime (Nginx)
# ===============================
FROM nginx:alpine AS runtime

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built output
COPY --from=build /app/dist /usr/share/nginx/html

# Use a non-root user for security
RUN adduser -D -H -u 1001 spokenarr && \
    chown -R spokenarr:spokenarr /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

USER spokenarr

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
