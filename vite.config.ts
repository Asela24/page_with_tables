import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/page_with_tables/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        404: './404.html',
        main: './index.html'
      }
    }
  }

});
