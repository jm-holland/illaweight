/**
 *  illaWeightCss v1.2.0
 *  https://illaweight.illaweb.eu
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : MIT https://gitlab.com/jmholland/illaweight/-/blob/master/LICENSE
 */

/** === Bascule du mode sombre === */

/** Langue d'affichage : anglais sur les pages /en/, français par défaut. */
const isEnPage = document.documentElement.lang.startsWith("en");

const themes = {
  light: "light",
  dark: "dark",
};
const dataAttribute = "data-theme";
const checkedAttribute = "aria-checked";
const localStorageKey = "theme";

// Vérifier si le système préfère le thème sombre
function userPrefersDarkThemeInOs() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}
// Définir l'attribut de thème sur l'élément document (c'est-à-dire sur <html>)
function setThemeAttribute(theme) {
  document.documentElement.setAttribute(dataAttribute, theme);
}

// Lire l'attribut de thème sur l'élément document (c'est-à-dire sur <html>)
function getThemeAttribute() {
  return document.documentElement.getAttribute(dataAttribute);
}

// Lire la valeur dans le stockage local
function getLocalStorage() {
  if (!window.localStorage) {
    return;
  }
  return window.localStorage.getItem(localStorageKey);
}

// Enregistrer la valeur dans le stockage local
function setLocalStorage(theme) {
  if (!window.localStorage) {
    return;
  }
  window.localStorage.setItem(localStorageKey, theme);
}

// Définir l'attribut checked sur l'élément interrupteur
function setSwitch(state, toggleSwitch) {
  toggleSwitch.setAttribute(checkedAttribute, state);
}

// Effectuer la bascule de thème
function switchTheme(toggleSwitch) {
  const wasChecked = toggleSwitch.getAttribute(checkedAttribute) === "true";
  setSwitch(!wasChecked, toggleSwitch);
  if (!wasChecked) {
    setThemeAttribute(themes.dark);
    setLocalStorage(themes.dark);
  } else {
    setThemeAttribute(themes.light);
    setLocalStorage(themes.light);
  }
}

// Initialiser l'élément de bascule du thème
function initThemeToggleSwitch(switchButtonSelector) {
    // Récupérer l'interrupteur de bascule du thème
    const toggleSwitch = document.querySelector(switchButtonSelector);
    if (getThemeAttribute() === themes.dark) {
        setSwitch(true, toggleSwitch);
    }

    /* Cas d'un interrupteur non natif (<input type="checkbox">) : sémantique
       explicite + activation clavier (WCAG 2.1.1). */
    if (!toggleSwitch.matches("input, button, a")) {
        if (!toggleSwitch.hasAttribute("role")) {
            toggleSwitch.setAttribute("role", "switch");
        }
        if (!toggleSwitch.hasAttribute("aria-label")) {
            toggleSwitch.setAttribute("aria-label", isEnPage ? "Dark theme" : "Thème sombre");
        }
        toggleSwitch.setAttribute("tabindex", "0");
        toggleSwitch.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
                event.preventDefault();
                event.target.click();
            }
        });
    }

    // Ajouter l'événement de clic à l'interrupteur de thème
    toggleSwitch.addEventListener(
        "click",
        () => switchTheme(toggleSwitch),
        false
    );
}

function initTheme() {
  const localStorageValue = getLocalStorage();
  if (localStorageValue) {
    setThemeAttribute(localStorageValue);
  } else if (userPrefersDarkThemeInOs()) {
    setThemeAttribute(themes.dark);
  }
}

initTheme();

window.addEventListener("DOMContentLoaded", () => {
  if (typeof initThemeToggleSwitch !== undefined) {
    initThemeToggleSwitch("#themeSwitch");
  }
});
