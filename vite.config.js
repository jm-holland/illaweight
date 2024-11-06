import { defineConfig } from "vite";
export default defineConfig({
  base: "/illaweight.git",
  css: {
    devSourcemap: true,
    postcss: "/postcss.config.js",
    preprocessorOptions: {
      css: {
        codeSplit: true,
      },
    },
  },
});
