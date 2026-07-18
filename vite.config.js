// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  return {
    // Force clean root on local dev, use subfolder only on build
    base: command === 'serve' ? '/' : '/interviewiq-coach/',
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('chart.js') || id.includes('react-chartjs-2')) return 'vendor-charts';
              if (id.includes('framer-motion')) return 'vendor-animations';
              return 'vendor-core';
            }
          }
        }
      },
      chunkSizeWarningLimit: 600
    }
  };
});