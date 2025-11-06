import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// Import conditionally (avoids errors when SKIP_IMAGEMIN=true)
let viteImagemin;
if (process.env.SKIP_IMAGEMIN !== 'true') {
  try {
    viteImagemin = (await import('vite-plugin-imagemin')).default;
  } catch {
    console.warn('⚠️ vite-plugin-imagemin not loaded (skipped).');
  }
}

export default defineConfig({
  plugins: [
    react(),

    // ✅ Conditionally include image optimization
    ...(process.env.SKIP_IMAGEMIN === 'true'
      ? []
      : [
          viteImagemin({
            gifsicle: { optimizationLevel: 3 },
            optipng: { optimizationLevel: 5 },
            mozjpeg: { quality: 80 },
            pngquant: { quality: [0.7, 0.9] },
            svgo: {
              plugins: [
                { name: 'removeViewBox', active: false },
                { name: 'removeEmptyAttrs', active: true },
              ],
            },
          }),
        ]),

    // ✅ Enable Brotli + Gzip compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 512,
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 512,
    }),

    // ✅ PWA support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'spinner.png'],
      manifest: {
        name: 'Spokenarr',
        short_name: 'Spokenarr',
        description:
          'The intelligent audiobook manager — discover, download, and organize seamlessly.',
        theme_color: '#1e3a8a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '48x48',
            type: 'image/x-icon',
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'spinner.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/spokenarr-api.*$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'spokenarr-api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'spokenarr-image-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    manifest: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },

  server: {
    port: 5173,
    open: true,
  },
});
