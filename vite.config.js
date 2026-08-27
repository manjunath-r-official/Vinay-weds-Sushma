import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Ananya & Vikram — Wedding Invitation',
        short_name: 'A & V Wedding',
        description: 'Join us as we begin our forever.',
        theme_color: '#3B0D14',
        background_color: '#26080D',
        display: 'standalone',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  build: {
    target: 'es2018',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion', 'gsap'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // For GitHub Pages deployment under a repo subpath, set base: '/your-repo-name/'
  base: './',
});
