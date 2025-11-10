import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy for local dev (optional)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5080'
    }
  },
  build: {
    outDir: 'dist'
  }
})
