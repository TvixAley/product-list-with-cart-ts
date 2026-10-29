import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/product-list-with-cart-ts/',
  plugins: [react(), svgr({ include: '**/*.svg?react' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
