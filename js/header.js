(() => {
    const headerHTML = `
<header class="site-header">
    <button 
        type="button"
        id="menuBtn" 
        class="menu-button"
        aria-label="Abrir menu"
        aria-controls="sideMenu"
        aria-expanded="false">
        ☰
    </button>

    <div class="header-title-area">
        <h1 class="titulo-principal">Guilda Caveira de Troll</h1>
    </div>

    <img 
        src="https://i.imgur.com/OJJnoaL.png" 
        alt="Logo da Guilda" 
        class="logo-guilda-header">

    <div id="menuOverlay" class="menu-overlay" aria-hidden="true"></div>

    <nav id="sideMenu" class="side-menu" aria-hidden="true" aria-label="Menu principal">
        <div class="side-menu-top">
            <span>Menu da Guilda</span>

            <button 
                type="button"
                id="closeMenuBtn" 
                class="close-menu-button"
                aria-label="Fechar menu">
                ×
            </button>
        </div>

        <a class="menu-item" href="index.html">🏠 Home</a>
        <a class="menu-item" href="regras.html">📜 Regras</a>
        <a class="menu-item" href="historia.html">📖 História</a>
        <a class="menu-item" href="ficha.html">🧙 Criação de Ficha</a>
        <a class="menu-item" href="homebrew.html">⚒️ Homebrew</a>
        <a class="menu-item" href="classes-homebrew.html">🧬 Classes Homebrew</a>
        <a class="menu-item" href="bazar.html">🏪 Bazar Blackstaff</a>
        <a class="menu-item" href="magias.html">✨ Magias Homebrew</a>
        <a class="menu-item" href="panteoes.html">🏛️ Panteões</a>
        <a class="menu-item" href="atividades.html">🎲 Atividades</a>
        <a class="menu-item" href="profissoes.html">🛠️ Profissões</a>
        <a class="menu-item" href="atualizacoes.html">🔄 Atualizações</a>
    </nav>
</header>
`;

    function iniciarHeader() {
        const headerContainer = document.getElementById("site-header");

        if (headerContainer) {
            headerContainer.outerHTML = headerHTML;
        } else if (!document.querySelector(".site-header")) {
            document.body.insertAdjacentHTML("afterbegin", headerHTML);
        }

        const menuBtn = document.getElementById("menuBtn");
        const closeMenuBtn = document.getElementById("closeMenuBtn");
        const sideMenu = document.getElementById("sideMenu");
        const menuOverlay = document.getElementById("menuOverlay");

        if (!menuBtn || !sideMenu) {
            return;
        }

        const linksMenu = sideMenu.querySelectorAll(".menu-item");

        function abrirMenu() {
            sideMenu.classList.add("aberto");
            menuOverlay?.classList.add("ativo");

            sideMenu.setAttribute("aria-hidden", "false");
            menuOverlay?.setAttribute("aria-hidden", "false");
            menuBtn.setAttribute("aria-expanded", "true");

            document.body.classList.add("menu-aberto");
        }

        function fecharMenu() {
            sideMenu.classList.remove("aberto");
            menuOverlay?.classList.remove("ativo");

            sideMenu.setAttribute("aria-hidden", "true");
            menuOverlay?.setAttribute("aria-hidden", "true");
            menuBtn.setAttribute("aria-expanded", "false");

            document.body.classList.remove("menu-aberto");
        }

        function alternarMenu(event) {
            event.preventDefault();
            event.stopPropagation();

            if (sideMenu.classList.contains("aberto")) {
                fecharMenu();
            } else {
                abrirMenu();
            }
        }

        menuBtn.addEventListener("click", alternarMenu);

        closeMenuBtn?.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            fecharMenu();
        });

        menuOverlay?.addEventListener("click", () => {
            fecharMenu();
        });

        linksMenu.forEach((link) => {
            link.addEventListener("click", () => {
                fecharMenu();
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                fecharMenu();
            }
        });

        const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

        linksMenu.forEach((link) => {
            if (link.getAttribute("href") === paginaAtual) {
                link.classList.add("active");
            }
        });

        fecharMenu();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarHeader);
    } else {
        iniciarHeader();
    }
})();