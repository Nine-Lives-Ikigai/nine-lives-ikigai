import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

const routes = ['adopt', 'contact', 'donate', 'foster', 'privacy-policy', 'who-we-are'];

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'fix-image-orientation',
      async buildStart() {
        const dir = resolve('public/cats'); // adjust if source JPGs live elsewhere
        const files = readdirSync(dir).filter(f => /\.jpe?g$/i.test(f));
        for (const file of files) {
          const path = resolve(dir, file);
          const buffer = await sharp(path).rotate().toBuffer();
          await sharp(buffer).toFile(path);
        }
      }
    },
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