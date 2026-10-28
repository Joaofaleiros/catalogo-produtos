const produtos = [
  {
    nome: "Fone Bluetooth",
    preco: 129.9,
    categoria: "Eletrônicos",
    imagem: "imagens/fone-bluetooh.jpeg",
    descricao: "Fone sem fio, com conexão Bluetooh",
  },
  {
    nome: "Relógio Digital",
    preco: 89.9,
    categoria: "Acessórios",
    imagem: "imagens/relogio-digital.webp",
    descricao: "Relogio a prova de água",
  },
  {
    nome: "Mochila Casual",
    preco: 159.9,
    categoria: "Acessórios",
    imagem: "imagens/mochila.webp",
    descricao: "Mochila para seu dia a dia",
  },
  {
    nome: "Teclado Gamer",
    preco: 199.9,
    categoria: "Eletrônicos",
    imagem: "imagens/teclado-gamer.avif",
    descricao: "Teclado sem fio, com conexão USB e Bluetooh",
  },
  {
    nome: "Mouse Sem Fio",
    preco: 79.9,
    categoria: "Informática",
    imagem: "imagens/mouse-sem-fio.webp",
    descricao: "Mouse sem fio confortável para trabalho e estudos.",
  },
  {
    nome: "Monitor Full HD",
    preco: 699.9,
    categoria: "Informática",
    imagem: "imagens/monitor-full-hd.avif",
    descricao: "Monitor Full HD para trabalho, estudos e entretenimento.",
  },
  {
    nome: "Mochila para Notebook",
    preco: 189.9,
    categoria: "Acessórios",
    imagem: "imagens/mochila-notebook.jpeg",
    descricao: "Mochila espaçosa para transportar notebook e acessórios.",
  },
  {
    nome: "Webcam HD",
    preco: 149.9,
    categoria: "Informática",
    imagem: "imagens/webcam-hd.jpeg",
    descricao: "Webcam HD para reuniões, videochamadas e aulas online.",
  },
  {
    nome: "Notebook",
    preco: 2899.9,
    categoria: "Informática",
    imagem: "imagens/notebook.webp",
    descricao: "Notebook para trabalho, estudos e tarefas do dia a dia.",
  },
  {
    nome: "Óculos de Sol",
    preco: 119.9,
    categoria: "Acessórios",
    imagem: "imagens/oculos-de-sol.webp",
    descricao: "Óculos de sol com design moderno para o dia a dia.",
  },
  {
    nome: "Caixa de Som Bluetooth",
    preco: 159.9,
    categoria: "Eletrônicos",
    imagem: "imagens/caixa-de-som.webp",
    descricao: "Caixa de som portátil com conexão Bluetooth.",
  },
  {
    nome: "Teclado e Mouse sem Fio",
    preco: 139.9,
    categoria: "Eletrônicos",
    imagem: "imagens/teclado-mouse.webp",
    descricao: "Conjunto sem fio para deixar sua mesa mais organizada.",
  },
];

const listaProdutos = document.getElementById("lista-produtos");
const campoBusca = document.getElementById("campo-busca");
const filtroCategoria = document.getElementById("filtro-categoria");
const ordenarProdutos = document.getElementById("ordenar-produtos");
const mensagemVazia = document.getElementById("mensagem-vazia");
const botaoLimpar = document.getElementById("limpar-filtros");
const contadorProdutos = document.getElementById("contador-produtos");

function renderizarProdutos(lista) {
  listaProdutos.innerHTML = "";

  lista.forEach((produto) => {
    const card = document.createElement("article");
    card.classList.add("produto");

    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Ver detalhes de ${produto.nome}`);

    card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="produto-info">
                <span class="categoria">${produto.categoria}</span>
                <h3>${produto.nome}</h3>
                <p class="preco">
                    ${produto.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </p>
            </div>
        `;
    card.addEventListener("click", () => {
      document.getElementById("modal-imagem").src = produto.imagem;
      document.getElementById("modal-imagem").alt = produto.nome;

      document.getElementById("modal-categoria").textContent =
        produto.categoria;

      document.getElementById("modal-nome").textContent = produto.nome;

      document.getElementById("modal-descricao").textContent =
        produto.descricao;

      document.getElementById("modal-preco").textContent =
        produto.preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

      modalProduto.hidden = false;
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });

    listaProdutos.appendChild(card);
  });

  mensagemVazia.hidden = lista.length > 0;
  contadorProdutos.textContent = `Exibindo ${lista.length} ${lista.length === 1 ? "produto" : "produtos"}`;
}

function filtrarProdutos() {
  const termo = campoBusca.value.toLowerCase().trim();
  const categoriaSelecionada = filtroCategoria.value;
  const ordenacao = ordenarProdutos.value;

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeNome = produto.nome.toLowerCase().includes(termo);

    const correspondeCategoria =
      categoriaSelecionada === "Todos" ||
      produto.categoria === categoriaSelecionada;

    return correspondeNome && correspondeCategoria;
  });

  if (ordenacao === "menor-preco") {
    produtosFiltrados.sort((a, b) => a.preco - b.preco);
  } else if (ordenacao === "maior-preco") {
    produtosFiltrados.sort((a, b) => b.preco - a.preco);
  } else if (ordenacao === "nome-az") {
    produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  } else if (ordenacao === "nome-za") {
    produtosFiltrados.sort((a, b) => b.nome.localeCompare(a.nome, "pt-BR"));
  }

  renderizarProdutos(produtosFiltrados);
}

campoBusca.addEventListener("input", filtrarProdutos);
filtroCategoria.addEventListener("change", filtrarProdutos);
ordenarProdutos.addEventListener("change", filtrarProdutos);
botaoLimpar.addEventListener("click", () => {
  campoBusca.value = "";
  filtroCategoria.value = "Todos";
  ordenarProdutos.value = "padrao";

  renderizarProdutos(produtos);
});

renderizarProdutos(produtos);
const modalProduto = document.getElementById("modal-produto");
const fecharModal = document.getElementById("fechar-modal");

fecharModal.addEventListener("click", () => {
  modalProduto.hidden = true;
});
modalProduto.addEventListener("click", (event) => {
  if (event.target === modalProduto) {
    modalProduto.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modalProduto.hidden = true;
  }
});
