document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('sideMenu');

    if (!btn || !menu) return;

    let open = false;

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        open = !open;
        menu.style.left = open ? '0px' : '-320px';
        btn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function (e) {
        if (open && !menu.contains(e.target) && e.target !== btn) {
            open = false;
            menu.style.left = '-320px';
            btn.setAttribute('aria-expanded', 'false');
        }
    });
});