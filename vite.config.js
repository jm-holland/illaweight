import { defineConfig } from "vite";
export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        docs: "docs.html",
        scripts: "scripts.html",
      },
    },
  },
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
