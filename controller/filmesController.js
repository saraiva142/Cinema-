import { Filme } from "../model/filmesModel.js";

class FilmesController {
  constructor() {
    this.listaFilmes = [];
    this.idEmEdicao = null; // ID do filme que está sendo editado
    this.init();
  }

  init() {
    
    const btnSalvarFilme = document.getElementById("btn-salvar");
    
    btnSalvarFilme.addEventListener("click", (event) => {
      event.preventDefault(); // Evita comportamento padrão, pois lá o botão abre um modal
      this.adicionarFilme();
    });

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
    localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
  }

  carregarFilmesDoLocalStorage() {
    const filmesSalvos = localStorage.getItem("filmes");
    if (filmesSalvos) {
        this.listaFilmes = JSON.parse(filmesSalvos);
        this.atualizarTabela();
    }
  }

}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  const filmesController = new FilmesController();
  window.filmesController = filmesController; // Exposição global, se necessário
});