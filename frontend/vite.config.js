import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
    "/api": {
      target: "http://api:80",
      changeOrigin: true,
  },
});
