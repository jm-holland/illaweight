import { defineConfig } from "vite";
export default defineConfig({
  base: "/",
  css: {
    devSourcemap: true,
    postcss: "/postcss.config.js",
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
