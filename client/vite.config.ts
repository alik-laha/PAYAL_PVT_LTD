import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    sourcemap: false,

    minify: "esbuild",

    chunkSizeWarningLimit: 1500,

    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ["react", "react-dom"],
        },
      },
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
});