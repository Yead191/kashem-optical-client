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
});
