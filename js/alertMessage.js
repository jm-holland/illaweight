/**
 *  illaWeightCss v1.0.0
 *  https://illaweight.illaweb.fr
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : CC BY-NC-ND 4.0 https://creativecommons.org/licenses/by-nc-nd/4.0/
 */

/** === alert Message === */

let alert = document.querySelector(".alert");
let closeIcon = document.querySelector(".alert-close");
let progress = document.querySelector(".progress");
let timer;
timer = setTimeout(() => {
  alert.classList.add("hidden");

  progress.classList.add("hidden");
}, 6000); //1s = 1000 milliseconds

closeIcon.addEventListener("click", () => {
  alert.classList.add("hidden");
  clearTimeout(timer);
});
