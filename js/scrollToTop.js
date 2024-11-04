document.addEventListener("scroll", handleScroll);

let scrollToTopBtn = document.querySelector(".top-btn");

function handleScroll() {
  let scrollableHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  let GOLDEN_RATIO = 0.5;

  if (document.documentElement.scrollTop / scrollableHeight > GOLDEN_RATIO) {
    //show button

    scrollToTopBtn.style.display = "block";
  } else {
    //hide button

    scrollToTopBtn.style.display = "none";
  }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
}
