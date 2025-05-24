import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        admin: resolve(__dirname, 'admin.html'),
        auth: resolve(__dirname, 'auth.html'),
        catalog: resolve(__dirname, 'catalog.html'),
        carts: resolve(__dirname, 'carts.html'),
        favorites: resolve(__dirname, 'favorites.html'),
        feedback: resolve(__dirname, 'feedback.html'),
        user: resolve(__dirname, 'user.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(woff|woff2)$/.test(assetInfo.name)) {
            return 'fonts/[name][extname]';
          }
          if (/\.(png|jpe?g|svg|webp|gif)$/.test(assetInfo.name)) {
            return 'img/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          $fonts-dir: '../fonts';
          $images-dir: '../img';
        `
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});