import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const routes = ['adopt'];

export default defineConfig({
  plugins: [
    react(),
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
    port: 4000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});