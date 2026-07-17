// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/react-plugin'; // Standard Vite React compiler layer injection

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Splitting large vendor packages to maximize async browser downloads
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'vendor-charts'; // Heavy analytical layer chunk
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations'; // Layout animation layer chunk
            }
            return 'vendor-core'; // Standard runtime dependencies (axios, router, etc.)
          }
        }
      }
    },
    chunkSizeWarningLimit: 600 // Raise baseline to accommodate structured layout engines cleanly
  }
});