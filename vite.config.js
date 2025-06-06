import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
    // Allow Netlify preview URLs
    allowedHosts: [
      '.netlify.app'
    ]
  }
}); 