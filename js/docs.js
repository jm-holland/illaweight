/**
 *  illaWeightCss v1.0.0
 *  https://illaweight.illaweb.fr
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : CC BY-NC-ND 4.0 https://creativecommons.org/licenses/by-nc-nd/4.0/
 */

/** === Scrollspy de la documentation === */

const links = Array.from(
    document.querySelectorAll(".docs-nav a[href^='#']")
).filter((a) => a.getAttribute("href").length > 1);

const byId = new Map(
    links.map((a) => [a.getAttribute("href").slice(1), a])
);

function setActive(id) {
    links.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`)
    );
}

if (byId.size) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        { rootMargin: "-10% 0px -75% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
        if (byId.has(section.id)) {
            observer.observe(section);
        }
    });

    links.forEach((a) => {
        a.addEventListener("click", () =>
            setActive(a.getAttribute("href").slice(1))
        );
    });

    const current = window.location.hash.slice(1);
    setActive(byId.has(current) ? current : links[0].getAttribute("href").slice(1));
}

/** === Demos adaptatives : grand visuel => pleine largeur, code dessous === */

const STACK_THRESHOLD = 340; // px : au-dessus, le visuel prend toute la colonne
const MD_PX = 1024; // breakpoint md (64rem)

function restackDemos() {
    document.querySelectorAll(".docs-demo").forEach((pair) => {
        const preview = pair.children[0];
        const code = pair.children[1];
        if (!preview || !code) return;

        /* mesure en mode cote a cote pour comparer les hauteurs naturelles */
        pair.classList.remove("docs-demo--stacked");
        if (window.innerWidth < MD_PX) return;

        if (
            preview.offsetHeight > Math.max(STACK_THRESHOLD, code.offsetHeight)
        ) {
            pair.classList.add("docs-demo--stacked");
        }
    });
}

let restackTimer = 0;
window.addEventListener("resize", () => {
    clearTimeout(restackTimer);
    restackTimer = setTimeout(restackDemos, 120);
});
window.addEventListener("load", restackDemos);
restackDemos();
