document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('sideMenu');

    if (!btn || !menu) return;

    const menuWidth = 240; // ajuste aqui a largura do menu
    const closedLeft = -(menuWidth + 20);

    menu.style.width = menuWidth + 'px';
    menu.style.left = closedLeft + 'px';

    let open = false;

    btn.addEventListener('click', function (e) {
        e.stopPropagation();

        open = !open;

        menu.style.width = menuWidth + 'px';
        menu.style.left = open ? '0px' : closedLeft + 'px';

        btn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function (e) {
        if (open && !menu.contains(e.target) && e.target !== btn) {
            open = false;
            menu.style.left = closedLeft + 'px';
            btn.setAttribute('aria-expanded', 'false');
        }
    });
});