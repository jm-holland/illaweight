/**
 *  illaWeightCss v1.2.0
 *  https://illaweight.illaweb.eu
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : MIT https://gitlab.com/jmholland/illaweight/-/blob/master/LICENSE
 */

/** == Dark mod switch == */

const themes = {
  light: "light",
  dark: "dark",
};
const dataAttribute = "data-theme";
const checkedAttribute = "aria-checked";
const localStorageKey = "theme";

// Check if the OS is set to prefer the dark color scheme
function userPrefersDarkThemeInOs() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}
// Set the theme attribute on the document element (aka on <html>)
function setThemeAttribute(theme) {
  document.documentElement.setAttribute(dataAttribute, theme);
}

// Get theme attribute on the document element (aka on <html>)
function getThemeAttribute() {
  return document.documentElement.getAttribute(dataAttribute);
}

// Get the local storage value
function getLocalStorage() {
  if (!window.localStorage) {
    return;
  }
  return window.localStorage.getItem(localStorageKey);
}

// Set the local storage value
function setLocalStorage(theme) {
  if (!window.localStorage) {
    return;
  }
  window.localStorage.setItem(localStorageKey, theme);
}

// Set the checked attribute on the switch toggle element
function setSwitch(state, toggleSwitch) {
  toggleSwitch.setAttribute(checkedAttribute, state);
}

// Perform theme switch
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

// Initialise the theme switch element
function initThemeToggleSwitch(switchButtonSelector) {
    // Get theme toggle switch
    const toggleSwitch = document.querySelector(switchButtonSelector);
    if (getThemeAttribute() === themes.dark) {
        setSwitch(true, toggleSwitch);
    }

    /* Cas d'un toggle non natif (<input type="checkbox">) : semantics
       explicit + activation clavier (WCAG 2.1.1). */
    if (!toggleSwitch.matches("input, button, a")) {
        if (!toggleSwitch.hasAttribute("role")) {
            toggleSwitch.setAttribute("role", "switch");
        }
        if (!toggleSwitch.hasAttribute("aria-label")) {
            toggleSwitch.setAttribute("aria-label", "Thème sombre");
        }
        toggleSwitch.setAttribute("tabindex", "0");
        toggleSwitch.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
                event.preventDefault();
                event.target.click();
            }
        });
    }

    // Add click event to theme toggle switch
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
