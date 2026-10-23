import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep viewer dependencies behind the viewer's dynamic import instead of
  // combining unrelated dependencies into a shared catch-all vendor chunk.
  build: { sourcemap: false, cssCodeSplit: true, manifest: true },
});
