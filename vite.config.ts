import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { prerenderMeta } from "./prerender-meta.ts";

export default defineConfig({
  // Dev server stays on localhost; run `npm run dev -- --host` to test on a phone.
  server: {
    hmr: { overlay: false },
  },

  // prerenderMeta: per-route <head> tags and sitemap.xml at build time (see prerender-meta.ts)
  plugins: [react(), prerenderMeta()],

  resolve: {
    alias: { "@": `${import.meta.dirname}/src` },
  },

  build: {
    chunkSizeWarningLimit: 1000,
    target: 'es2020',
    // .vite/manifest.json maps each page module to its chunk, so prerender-meta can preload it
    manifest: true,
    rollupOptions: {
      output: {
        // Long-lived vendor chunks so app changes don't bust their cache
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion') || id.includes('motion-')) return 'motion';
          if (/[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor';
        },
      },
    },
  },
});
