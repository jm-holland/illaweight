/**
 *  illaWeightCss v1.0.0
 *  https://illaweight.illaweb.fr
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : CC BY-NC-ND 4.0 https://creativecommons.org/licenses/by-nc-nd/4.0/
 */

/** === Modals — API data-attributes === */
/** ouvrir : <button data-modal-open="id-du-modal">, fermer : [data-modal-close], clic fond, Esc */

let modalTrigger = null;

function openModal(modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

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
