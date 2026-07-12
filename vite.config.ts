import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const routes = ['adopt', 'contact', 'donate', 'foster', 'privacy-policy', 'who-we-are'];

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 78 },
      jpeg: { quality: 78 },
      png: { quality: 78 },
      webp: { lossless: true },
    }),
    {
      name: 'gh-pages-spa-routes',
      closeBundle() {
        for (const route of routes) {
          mkdirSync(resolve('dist', route), { recursive: true });
          copyFileSync(resolve('dist/index.html'), resolve('dist', route, 'index.html'));
        }
        copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'));
      }
    }
  ],
  server: {
    port: 4000,
    proxy: {
      '/api': {
        // Wrangler's local dev server default port is 8787
        target: 'http://localhost:8787',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});