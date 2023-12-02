import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://andrefa-mern-op5b1bhg8-mahmood787.vercel.app",
        changeOrigin: true,
       
      },
    },
  },
});
