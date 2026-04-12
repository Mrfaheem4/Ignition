import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    minify: "esbuild",
    esbuildOptions: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // three.js + @react-three/* must stay together — circular deps across chunks break them
          if (id.includes("three") || id.includes("@react-three"))
            return "vendor-three";

          if (id.includes("gsap")) return "vendor-gsap";
          if (id.includes("react-router")) return "vendor-router";

          // Split React core for long-term caching (rarely changes)
          if (id.includes("react-dom") || id.includes("/react/"))
            return "vendor-react";

          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
  },
}));
