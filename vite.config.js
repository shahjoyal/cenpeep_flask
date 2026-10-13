import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev: run the (unchanged) Flask backend on :5000 and `npm run dev` here —
// every /api call is proxied to Flask. Build: `npm run build` emits ./dist,
// which Flask can serve in place of the old public/ folder (see README).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5000' },
  },
  build: { outDir: 'dist' },
});
