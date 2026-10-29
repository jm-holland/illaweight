/**
 *  illaWeightCss v1.2.0
 *  https://illaweight.illaweb.eu
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : MIT https://gitlab.com/jmholland/illaweight/-/blob/master/LICENSE
 */

/** === Message d'alerte === */

/** Langue d'affichage : anglais sur les pages /en/, français par défaut. */
const isEnPage = document.documentElement.lang.startsWith("en");

const alert = document.querySelector(".alert");
const closeIcon = document.querySelector(".alert-close");
const progress = document.querySelector(".progress");
const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
).matches;
let timer;

/** Rôles ARIA : la notification est annoncée automatiquement (live region). */
function setupAccessibility() {
    if (!alert) {
        return;
    }

    if (!alert.hasAttribute("role")) {
        alert.setAttribute("role", "alert");
    }
    if (!alert.hasAttribute("aria-live")) {
        alert.setAttribute("aria-live", "assertive");
    }

    if (closeIcon && closeIcon.matches("button, a, [role], [tabindex]")) {
        return;
    }

    closeIcon.setAttribute("tabindex", "0");
    closeIcon.setAttribute("role", "button");
    if (!closeIcon.hasAttribute("aria-label")) {
        closeIcon.setAttribute("aria-label", isEnPage ? "Close notification" : "Fermer la notification");
    }
}

/** Masque l'alerte (visuel + lecteurs d'écran via aria-hidden). */
function hideAlert() {
    alert.classList.add("hidden");
    alert.setAttribute("aria-hidden", "true");
    progress?.classList.add("hidden");
    clearTimeout(timer);
}

/* Auto-fermeture suspendue si l'utilisateur demande moins d'animations
   (WCAG 2.2.1 : la surprise timer ne doit pas forcer un mouvement). */
function scheduleAutoHide() {
    if (prefersReducedMotion) {
        return;
    }

    timer = setTimeout(() => {
        alert.classList.add("hidden");
        alert.setAttribute("aria-hidden", "true");
        progress?.classList.add("hidden");
    }, 6000); // 1s = 1000 milliseconds
}

/* Pause du compteur pendant le survol ou le focus (lecture en cours). */
function setupTimerControls() {
    if (prefersReducedMotion || !closeIcon) {
        return;
    }

    closeIcon.addEventListener("mouseenter", () => clearTimeout(timer));
    closeIcon.addEventListener("focus", () => clearTimeout(timer));
    closeIcon.addEventListener("mouseleave", scheduleAutoHide);
    closeIcon.addEventListener("blur", scheduleAutoHide);
}

/** Fermeture au clavier si l'élément de fermeture n'est pas natif. */
function setupKeyboard() {
    if (!closeIcon || closeIcon.matches("button, a")) {
        return;
    }

    closeIcon.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
            event.preventDefault();
            closeIcon.click();
        }
    });
}

setupAccessibility();

if (alert && closeIcon) {
    setupTimerControls();
    setupKeyboard();
    scheduleAutoHide();

    closeIcon.addEventListener("click", () => {
        alert.classList.add("hidden");
        clearTimeout(timer);
    });
}
