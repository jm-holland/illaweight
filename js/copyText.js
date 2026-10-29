/**
 *  illaWeightCss v1.2.0
 *  https://illaweight.illaweb.eu
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : MIT https://gitlab.com/jmholland/illaweight/-/blob/master/LICENSE
 */

/** === Copie du texte === */
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
        this.getElementsByTagName("i")[0].append("  copié");
        setTimeout(() => {
          this.getElementsByTagName("i")[0].classList.remove(
            "bi-clipboard-check"
          );
          this.getElementsByTagName("i")[0].classList.add("bi-clipboard");
          this.getElementsByTagName("i")[0].textContent = "";
        }, 1500);
      });
    } catch (e) {
      alert("Une erreur est survenue !");
    }
  });
  add_icon();
  copyText();
}
