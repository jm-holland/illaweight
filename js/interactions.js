/**
 *  illaWeightCss v1.2.0
 *  https://illaweight.illaweb.eu
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : MIT https://gitlab.com/jmholland/illaweight/-/blob/master/LICENSE
 */

/** === Modals — API data-attributes === */
/** ouvrir : <button data-modal-open="id-du-modal">, fermer : [data-modal-close], clic fond, Esc */

let modalTrigger = null;

function openModal(modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-dialog")?.setAttribute("tabindex", "-1");

    const focusable = modal.querySelector(
        "input:not([type=hidden]), button, [href], select, textarea, .modal-dialog"
    );

    focusable.focus();
}

function closeModal(modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalTrigger?.focus();
    modalTrigger = null;
}

document.addEventListener("click", (event) => {
    const openTrigger = event.target.closest("[data-modal-open]");

    if (openTrigger) {
        const modal = document.getElementById(
            openTrigger.getAttribute("data-modal-open")
        );

        if (modal) {
            modalTrigger = openTrigger;
            openModal(modal);
        }

        return;
    }

    if (event.target.closest("[data-modal-close]")) {
        closeModal(event.target.closest(".modal"));

        return;
    }

    /** clic sur le fond (hors modal-dialog) */
    if (event.target.classList.contains("modal")) {
        closeModal(event.target);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    const modal = document.querySelector(".modal.active");

    if (modal) {
        closeModal(modal);
    }
});

/** Piège à focus (WCAG 2.1.2) : Tab/Shift+Tab restent dans la modale. */
document.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") {
        return;
    }

    const modal = document.querySelector(".modal.active");

    if (!modal) {
        return;
    }

    const focusables = modal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([type=hidden]):not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusables.length === 0) {
        return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
    }
});

/** === Tabs — API data-attributes === */
/** <a href="#pane-id" data-tab>  +  .tab-pane correspondant */

document.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-tab]");

    if (!tab) {
        return;
    }

    event.preventDefault();

    const pane = document.querySelector(tab.getAttribute("href"));

    tab.closest(".tabs")
        .querySelectorAll("[data-tab]")
        .forEach((el) => {
            const isSelf = el === tab;
            el.classList.toggle("active", isSelf);
            el.setAttribute(
                "aria-selected",
                isSelf ? "true" : "false"
            );
        });

    pane.parentElement.querySelectorAll(".tab-pane").forEach((el) => {
        el.classList.toggle("active", el === pane);
    });
});

/** Rôles ARIA : tablist / tab / tabpanel (WCAG — pattern Tabs). */
document.querySelectorAll(".tabs").forEach((tabs) => {
    tabs.setAttribute("role", "tablist");
    tabs.querySelectorAll("[data-tab]").forEach((el) => {
        el.setAttribute("role", "tab");
        if (!el.hasAttribute("aria-selected")) {
            el.setAttribute("aria-selected", "false");
        }
    });
});
document.querySelectorAll(".tab-pane").forEach((el) => {
    if (!el.hasAttribute("role")) {
        el.setAttribute("role", "tabpanel");
    }
});

/** Clavier des onglets (WCAG 2.1.1) : flèches, Début/Fin. */
document.addEventListener("keydown", (event) => {
    const tab = event.target.closest("[data-tab]");

    if (!tab) {
        return;
    }

    const siblings = Array.from(
        tab.closest(".tabs").querySelectorAll("[data-tab]")
    );
    const index = siblings.indexOf(tab);
    let next = null;

    if (event.key === "ArrowRight") {
        next = siblings[(index + 1) % siblings.length];
    } else if (event.key === "ArrowLeft") {
        next = siblings[(index - 1 + siblings.length) % siblings.length];
    } else if (event.key === "Home") {
        next = siblings[0];
    } else if (event.key === "End") {
        next = siblings[siblings.length - 1];
    }

    if (next && next !== tab) {
        event.preventDefault();
        next.focus();
        next.click();
    }
});

