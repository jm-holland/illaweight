import "./src/sass/main.scss";
import "./node_modules/highlight.js/styles/atom-one-dark.min.css";
import "./node_modules/@tabler/icons-webfont/dist/tabler-icons.min.css";
import hljs from "highlight.js/lib/common";

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("pre code").forEach((el) => {
    hljs.highlightElement(el);
  });
});
