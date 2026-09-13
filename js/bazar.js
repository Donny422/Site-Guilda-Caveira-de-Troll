(() => {
    "use strict";

    const input = document.getElementById("bazar-search");
    const clearButton = document.getElementById("bazar-search-clear");
    const status = document.getElementById("bazar-search-status");

    if (!input || !clearButton || !status) return;

    const page = document.querySelector(".pagina-bazar");
    if (!page) return;

    const details = Array.from(page.querySelectorAll("details"));
    const homebrewColumns = page.querySelector(".columns");
    const homebrewBoxes = homebrewColumns
        ? Array.from(homebrewColumns.children)
        : [];

    const normalize = (text) => {
        return text
            .toLocaleLowerCase("pt-BR")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const itemRows = [];
    details.forEach((detail) => {
        detail.querySelectorAll("tbody tr").forEach((row) => {
            itemRows.push({ row, detail });
        });
    });

    const emptyMessage = document.createElement("p");
    emptyMessage.className = "bazar-sem-resultado bazar-oculto";
    emptyMessage.textContent = "Nenhum item encontrado para a pesquisa.";
    const searchBox = page.querySelector(".bazar-pesquisa");
    if (searchBox) searchBox.after(emptyMessage);

    function applySearch() {
        const term = normalize(input.value.trim());

        if (!term) {
            details.forEach((detail) => {
                detail.classList.remove("bazar-oculto");
                detail.open = false;
                detail.querySelectorAll("tbody tr").forEach((row) => {
                    row.classList.remove("bazar-oculto");
                });
            });

            homebrewBoxes.forEach((box) => box.classList.remove("bazar-oculto"));
            emptyMessage.classList.add("bazar-oculto");
            status.textContent = "";
            return;
        }

        let found = 0;

        details.forEach((detail) => {
            const rows = Array.from(detail.querySelectorAll("tbody tr"));
            let detailHasMatch = false;

            rows.forEach((row) => {
                const matches = normalize(row.textContent).includes(term);
                row.classList.toggle("bazar-oculto", !matches);

                if (matches) {
                    detailHasMatch = true;
                    found++;
                }
            });

            // Também permite encontrar pelo nome da categoria ou pelo preço/observações.
            const categoryText = normalize(
                (detail.querySelector("summary")?.textContent || "") +
                " " +
                (detail.querySelector(".conteudo-categoria")?.textContent || "")
            );
            const categoryMatch = categoryText.includes(term);

            detail.classList.toggle("bazar-oculto", !detailHasMatch && !categoryMatch);
            detail.open = detailHasMatch || categoryMatch;

            // Se a pesquisa encontrou a categoria, mostra todas as linhas dela.
            if (categoryMatch && !detailHasMatch) {
                rows.forEach((row) => row.classList.remove("bazar-oculto"));
            }
        });

        homebrewBoxes.forEach((box) => {
            const matches = normalize(box.textContent).includes(term);
            box.classList.toggle("bazar-oculto", !matches);
            if (matches) found++;
        });

        const visibleDetails = details.filter(
            (detail) => !detail.classList.contains("bazar-oculto")
        ).length;

        if (found > 0) {
            status.textContent = `${found} resultado${found === 1 ? "" : "s"} encontrado${found === 1 ? "" : "s"}.`;
            emptyMessage.classList.add("bazar-oculto");
        } else if (visibleDetails > 0) {
            status.textContent = "Categoria encontrada.";
            emptyMessage.classList.add("bazar-oculto");
        } else {
            status.textContent = "Nenhum resultado.";
            emptyMessage.classList.remove("bazar-oculto");
        }
    }

    input.addEventListener("input", applySearch);

    clearButton.addEventListener("click", () => {
        input.value = "";
        applySearch();
        input.focus();
    });
})();
