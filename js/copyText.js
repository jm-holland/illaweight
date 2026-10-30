/**
 *  illaWeightCss v1.2.0
 *  https://illaweight.illaweb.eu
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : MIT https://gitlab.com/jmholland/illaweight/-/blob/master/LICENSE
 */

/** === Copie du texte === */

/** Langue d'affichage : anglais sur les pages /en/, français par défaut. */
const isEnPage = document.documentElement.lang.startsWith("en");

function add_icon() {
  let iconCopy = document.createElement("i");
  iconCopy.classList.add("ti", "ti-clipboard");

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
        this.getElementsByTagName("i")[0].classList.remove("ti-clipboard");
        this.getElementsByTagName("i")[0].classList.add("ti-clipboard-check");
        this.getElementsByTagName("i")[0].append(isEnPage ? "  copied" : "  copié");
        setTimeout(() => {
          this.getElementsByTagName("i")[0].classList.remove(
            "ti-clipboard-check"
          );
          this.getElementsByTagName("i")[0].classList.add("ti-clipboard");
          this.getElementsByTagName("i")[0].textContent = "";
        }, 1500);
      });
    } catch (e) {
      alert(isEnPage ? "An error has occurred!" : "Une erreur est survenue !");
    }
  });
  add_icon();
  copyText();
}
