import "./src/sass/main.scss";
import "./node_modules/highlight.js/styles/atom-one-dark.min.css";
import "./src/sass/vendor/_tabler-icons.scss";
import hljs from "highlight.js/lib/common";

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("pre code").forEach((el) => {
    hljs.highlightElement(el);
  });
});
