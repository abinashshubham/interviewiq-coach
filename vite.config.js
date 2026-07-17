// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/react-plugin';

export default defineConfig({
  // Add your repository name wrapped in slashes here:
  base: '/interviewiq-coach/', 
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'vendor-charts';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            return 'vendor-core';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});