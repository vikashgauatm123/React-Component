import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Frontend-only React project
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // adjust if needed
    },
  },
  server: {
    port: 5173, // default Vite port
  },
});
