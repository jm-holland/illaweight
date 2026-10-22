/**
 *  illaWeightCss v1.0.0
 *  https://illaweight.illaweb.fr
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : MIT https://gitlab.com/jmholland/illaweight/-/blob/master/LICENSE
 */

/** === Menu burger closed after click on link === */
/** === Dropdowns : le clic sur un parent eplie / replie son sous-menu === */

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

    /** Lien simple : referme le menu burger apres navigation */
    if (!submenu) {
        link.addEventListener("click", () => {
            document.getElementById("menu-hamburger").checked = false;
        });

        return;
    }

    /** Lien parent : bascule l'ouverture (epingle le sous-menu) */
    link.setAttribute("aria-expanded", "false");
    link.setAttribute("aria-haspopup", "true");

    link.addEventListener("click", (event) => {
        event.preventDefault();

        const isOpen = li.classList.toggle("open");
        link.setAttribute("aria-expanded", String(isOpen));

        /** Un seul sous-menu ouvert a la fois */
        document.querySelectorAll(".menu li.open").forEach((other) => {
            if (other !== li) {
                other.classList.remove("open");
                other.querySelector(":scope > a")
                    ?.setAttribute("aria-expanded", "false");
            }
        });
    });
});

/** Ferme les sous-menus : clic a l'exterieur ou touche Esc */
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
