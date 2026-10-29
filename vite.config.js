import { defineConfig } from "vite";
export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        docs: "docs.html",
        scripts: "scripts.html",
        enMain: "en/index.html",
        enDocs: "en/docs.html",
        enScripts: "en/scripts.html",
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
