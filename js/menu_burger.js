document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function () {
        document.getElementById('menu-hamburger').checked = false;
    });
});