/**
 *  illaWeightCss v1.0.0
 *  https://illaweight.illaweb.fr
 *
 *  Copyright(c) 2024 jm Holland
 *  licence : CC BY-NC-ND 4.0 https://creativecommons.org/licenses/by-nc-nd/4.0/
 */

/** === Menu burger closed after click on link === */
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function () {
        document.getElementById('menu-hamburger').checked = false;
    });
});