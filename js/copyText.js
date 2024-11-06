/**
 *  illaWeightCss v1.0.0
 *  https://illaweight.illaweb.fr
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : CC BY-NC-ND 4.0 https://creativecommons.org/licenses/by-nc-nd/4.0/
 */

/** === Copy text === */
function add_icon() {
  let iconCopy = document.createElement("i");
  iconCopy.classList.add("bi", "bi-clipboard");

  let code = document.querySelectorAll("code");
  let it = code.values();
  let entry;
  while (!(entry = it.next()).done) {
    const element = entry.value;
    element.appendChild(iconCopy.cloneNode());
  }
}

function copyText() {
  const pre = document.querySelectorAll("pre");
  pre.forEach((preEl) => {
    try {
      preEl.addEventListener("click", () => {
        let copyVal = this.getElementsByTagName("code")[0].textContent;
        navigator.clipboard.writeText(copyVal);
        this.getElementsByTagName("i")[0].classList.remove("bi-clipboard");
        this.getElementsByTagName("i")[0].classList.add("bi-clipboard-check");
        this.getElementsByTagName("i")[0].append("  copy");
        setTimeout(() => {
          this.getElementsByTagName("i")[0].classList.remove(
            "bi-clipboard-check"
          );
          this.getElementsByTagName("i")[0].classList.add("bi-clipboard");
          this.getElementsByTagName("i")[0].textContent = "";
        }, 1500);
      });
    } catch (e) {
      alert("an error has occurred !");
    }
  });
  add_icon();
  copyText();
}
