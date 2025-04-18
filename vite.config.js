// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Assuming you're using React based on .jsx

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Maps @ to the src directory
    },
  },
  optimizeDeps: {
    include: ['framer-motion'], // Pre-bundle framer-motion
    force: true, // Force pre-bundling
  },
  build: {
    commonjsOptions: {
      include: [/framer-motion/, /node_modules/], // Handle CommonJS modules
    },
  },
});
