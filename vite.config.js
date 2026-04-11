import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Separate three.js ecosystem
            if (id.includes("three")) return "vendor-three";
            if (id.includes("@react-three")) return "vendor-three-fiber";
            // Separate animation library
            if (id.includes("gsap")) return "vendor-gsap";
            // React and router
            if (id.includes("react-router")) return "vendor-router";
            // Everything else
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
