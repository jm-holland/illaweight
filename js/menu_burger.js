/**
 *  illaWeightCss v1.2.0
 *  https://illaweight.illaweb.eu
 *
 *  Copyright(c) 2026 jm Holland
 *  licence : MIT https://gitlab.com/jmholland/illaweight/-/blob/master/LICENSE
 */

/** === Menu hamburger fermé après clic sur un lien === */
/** === Déroulants : le clic sur un parent plie / replie son sous-menu === */

function closeSubmenus() {
    document.querySelectorAll(".menu li.open").forEach((li) => {
        li.classList.remove("open");
        li.querySelector(":scope > a")
            ?.setAttribute("aria-expanded", "false");
    });
}

document.querySelectorAll(".menu a").forEach((link) => {
    const li = link.parentElement;
    const submenu = li.querySelector(":scope > ul");

    /** Lien simple : referme le menu hamburger après navigation */
    if (!submenu) {
        link.addEventListener("click", () => {
            document.getElementById("menu-hamburger").checked = false;
        });

        return;
    }

    /** Lien parent : bascule l'ouverture (épingle le sous-menu) */
    link.setAttribute("aria-expanded", "false");
    link.setAttribute("aria-haspopup", "true");

    link.addEventListener("click", (event) => {
        event.preventDefault();

        const isOpen = li.classList.toggle("open");
        link.setAttribute("aria-expanded", String(isOpen));

        /** Un seul sous-menu ouvert à la fois */
        document.querySelectorAll(".menu li.open").forEach((other) => {
            if (other !== li) {
                other.classList.remove("open");
                other.querySelector(":scope > a")
                    ?.setAttribute("aria-expanded", "false");
            }
        });
    });
});

/** Ferme les sous-menus : clic à l'extérieur ou touche Esc */
document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu")) {
        closeSubmenus();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSubmenus();
    }
});
