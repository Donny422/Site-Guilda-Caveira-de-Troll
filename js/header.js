const headerHTML = `
<header>
    <div style="display:flex;align-items:center;gap:5px;">
        <button 
            id="menuBtn" 
            style="background:none;border:none;color:#f3e7c3;font-size:32px;cursor:pointer;"
            aria-label="Abrir menu"
            aria-controls="sideMenu"
            aria-expanded="false">
            ☰
        </button>

        <div class="logo">
            <img src="https://i.imgur.com/OJJnoaL.png" alt="Logo da Guilda" class="logo-guilda">
            <h1 class="titulo-principal">Guilda Caveira de Troll</h1>
        </div>
    </div>

    <div 
        id="sideMenu" 
        style="position:fixed;top:0;left:-320px;width:300px;height:100%;background:#161616;transition:.3s;padding-top:10px;z-index:1000;border-right:3px solid #7a1d1d;">

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
    </div>
</header>
`;

const headerContainer = document.getElementById("site-header");
headerContainer.outerHTML = headerHTML;

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
    const aberto = sideMenu.style.left === "0px";

    sideMenu.style.left = aberto ? "-320px" : "0px";
    menuBtn.setAttribute("aria-expanded", aberto ? "false" : "true");
});

document.addEventListener("click", (event) => {
    const clicouFora =
        !sideMenu.contains(event.target) &&
        !menuBtn.contains(event.target);

    if (clicouFora) {
        sideMenu.style.left = "-320px";
        menuBtn.setAttribute("aria-expanded", "false");
    }
});