/**
 *  illaWeightCss v1.1.0
 *  https://illaweight.illaweb.fr
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : MIT https://gitlab.com/jmholland/illaweight/-/blob/master/LICENSE
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
