import { Filme } from "../model/filmesModel.js";

class FilmesController {
  constructor() {
    this.listaFilmes = [];
    this.idEmEdicao = null; // ID do filme que está sendo editado
    this.init();
  }

  init() {
    const btnSalvarFilme = document.getElementById("btn-salvar");

    // Usando arrow function para preservar o contexto de `this`
    btnSalvarFilme.addEventListener("click", (event) => {
      event.preventDefault(); // Evita comportamento padrão
      this.adicionarFilme();
    });

    this.carregarFilmesDoLocalStorage();
  }

  adicionarFilme() {

    const filme = this.criarFilmeDoFormulario();

    if (this.idEmEdicao) {
      // Atualiza filme existente
      const index = this.listaFilmes.findIndex(f => f.id === this.idEmEdicao);
      this.listaFilmes[index] = filme;
    } else {
        // Adiciona novo filme
        this.listaFilmes.push(filme);
    }

    // Salva no localStorage e atualiza a tabela
    this.salvarNoLocalStorage();
    this.atualizarTabela();
  }

  criarFilmeDoFormulario() {
    const duracao = document.getElementById("inputDuracao").value;
    console.log("Duração capturada:", duracao); // Verifica o valor capturado
    return new Filme(
        this.idEmEdicao || Date.now(),
        document.getElementById("inputTitulo").value,
        document.getElementById("inputGenero").value,
        document.getElementById("inputDescricao").value,
        parseInt(document.getElementById("inputClassificaoIndicativa").value),
        duracao,
        document.getElementById("inputDataEstreia").value,
    );
  }

  salvarNoLocalStorage() {
    console.log("Salvando no localStorage:", this.listaFilmes); // Verifica os dados
    console.log("Salvando no localStorage:", this.listaFilmes); // Verifica os dados
  
    localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
  }

  carregarFilmesDoLocalStorage() {
    const filmesSalvos = localStorage.getItem("filmes");
    if (filmesSalvos) {
        this.listaFilmes = JSON.parse(filmesSalvos);
        this.atualizarTabela();
    }
  }

  atualizarTabela() {
    const tbody = document.querySelector("#filmes-tbody");
    if (!tbody) {
      console.error("O tbody não foi encontrado!");
      return;
    }
    tbody.innerHTML = "";
    console.log("Atualizando tabela com:", this.listaFilmes); // Verifica os dados

    this.listaFilmes.forEach(filme => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${filme.id}</td>
            <td><strong>${filme.titulo}</strong></td>
            <td>${filme.genero}</td>
            <td>${filme.descricao}</td>
            <td>${filme.classificacaoIndicativa}</td>
            <td>${filme.duracao}</td> <!-- Exibe a duração -->
            <td>${this.formatarData(filme.data)}</td>
            <td>
                <button class="btn btn-warning btn-sm btn-editar" data-id="${filme.id}">
                    <i class="bi bi-pencil-square"></i>
                </button>
                &nbsp;
                <button class="btn btn-danger btn-sm btn-excluir" data-id="${filme.id}">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);

        // Adiciona evento para o botão de editar
        tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(filme));
        tr.querySelector(".btn-excluir").addEventListener("click", () => this.abrirModalExcluir(filme.id));
    });
  }

  formatarData(data) {
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR");
}

}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  const filmesController = new FilmesController();
  window.filmesController = filmesController; // Exposição global, se necessário
});