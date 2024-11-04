let sortMenu = document.querySelector(".portfolio-menu").children;
console.log(sortMenu);
let sortItem = document.querySelector(".portfolio-item").children;
for (const element of sortMenu) {
  console.log(element);
  element.addEventListener("click", function () {
    for (const element of sortMenu) {
      element.classList.remove("current");
    }
    this.classList.add("current");

    let targetData = this.getAttribute("data-target");

    for (const element of sortItem) {
      element.classList.remove("active");
      element.classList.add("delete");

      if (
        element.getAttribute("data-item") == targetData ||
        targetData == "all"
      ) {
        element.classList.remove("delete");
        element.classList.add("active");
      }
    }
  });
}
