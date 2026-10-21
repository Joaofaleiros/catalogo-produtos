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
];

const listaProdutos = document.getElementById("lista-produtos");
const campoBusca = document.getElementById("campo-busca");
const filtroCategoria = document.getElementById("filtro-categoria");
const mensagemVazia = document.getElementById("mensagem-vazia");
const botaoLimpar = document.getElementById("limpar-filtros");
const contadorProdutos = document.getElementById("contador-produtos");

function renderizarProdutos(lista) {
  listaProdutos.innerHTML = "";

  lista.forEach((produto) => {
    const card = document.createElement("article");
    card.classList.add("produto");

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

    listaProdutos.appendChild(card);
  });

  mensagemVazia.hidden = lista.length > 0;
  contadorProdutos.textContent = `Exibindo ${lista.length} ${lista.length === 1 ? "produto" : "produtos"}`;
}

function filtrarProdutos() {
  const termo = campoBusca.value.toLowerCase().trim();
  const categoriaSelecionada = filtroCategoria.value;

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeNome = produto.nome.toLowerCase().includes(termo);

    const correspondeCategoria =
      categoriaSelecionada === "Todos" ||
      produto.categoria === categoriaSelecionada;

    return correspondeNome && correspondeCategoria;
  });

  renderizarProdutos(produtosFiltrados);
}

campoBusca.addEventListener("input", filtrarProdutos);
filtroCategoria.addEventListener("change", filtrarProdutos);
botaoLimpar.addEventListener("click", () => {
  campoBusca.value = "";
  filtroCategoria.value = "Todos";

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
