import { Sessoes } from "../model/sessoesModal.js";

class SessoesController {
    constructor() {
        this.listaSessoes = [];
        this.idEmEdicao = null; // ID da sessão que está sendo editada
        this.init();
    }

    init() {
        const btnSalvarSessao = document.getElementById("btn-salvar-sessao");

        // Usando arrow function para preservar o contexto de `this`
        btnSalvarSessao.addEventListener("click", (event) => {
            event.preventDefault(); // Evita comportamento padrão
            this.adicionarSessao();
        });

        this.carregarSessoesDoLocalStorage();
        this.carregarFilmesNoSelect(); // Carrega filmes no select
        this.carregarSalasNoSelect(); // Carrega filmes no select
    }

    //Como no formulário temos q pegar os filmes e salas, vou ter que fazer isso aqui:
    carregarFilmesNoSelect() {
        const filmesSalvos = localStorage.getItem("filmes");
        const selectFilme = document.getElementById("inputFilme");
    
        if (filmesSalvos) {
            const listaFilmes = JSON.parse(filmesSalvos);
    
            // Limpa o select antes de adicionar os filmes
            selectFilme.innerHTML = "";
    
            // Adiciona os filmes como opções no select
            listaFilmes.forEach(filme => {
                const option = document.createElement("option");
                option.value = filme.id; // ID do filme
                option.textContent = filme.titulo; // Título do filme
                selectFilme.appendChild(option);
            });
        }
    }
    
    carregarSalasNoSelect() {
        const salasSalvas = localStorage.getItem("salas");
        const selectSala = document.getElementById("inputSala");
    
        if (salasSalvas) {
            const listaSalas = JSON.parse(salasSalvas);
    
            // Limpa o select antes de adicionar as salas
            selectSala.innerHTML = "";
    
            // Adiciona as salas como opções no select
            listaSalas.forEach(sala => {
                const option = document.createElement("option");
                option.value = sala.id; // ID da sala
                option.textContent = sala.nome; // Nome da sala
                selectSala.appendChild(option);
            });
        }
    }

    adicionarSessao() {
        const sessao = this.criarSessaoDoFormulario();

        if (this.idEmEdicao) {
            // Atualiza sessão existente
            const index = this.listaSessoes.findIndex(s => s.id === this.idEmEdicao);
            this.listaSessoes[index] = sessao;
        } else {
            // Adiciona nova sessão
            this.listaSessoes.push(sessao);
        }

        // Salva no localStorage e atualiza a tabela
        this.salvarNoLocalStorage();
        this.atualizarTabela();
    }
    
    criarSessaoDoFormulario() {
        const selectFilme = document.getElementById("inputFilme");
        const selectSala = document.getElementById("inputSala");
    
        // Obtém o texto da opção selecionada
        const tituloFilme = selectFilme.options[selectFilme.selectedIndex]?.textContent || "";
        const nomeSala = selectSala.options[selectSala.selectedIndex]?.textContent || "";
    
        return new Sessoes(
            this.idEmEdicao || Date.now(),
            selectFilme.value, // ID do filme
            selectSala.value,  // ID da sala
            document.getElementById("inputDataHora").value,
            document.getElementById("inputValor").value,
            document.getElementById("inputIdioma").value,
            document.getElementById("inputFormato").value,
            tituloFilme, // Adiciona o título do filme
            nomeSala     // Adiciona o nome da sala
        );
    }

    salvarNoLocalStorage() {
        console.log("Salvando no localStorage:", this.listaSessoes); // Verifica os dados
        localStorage.setItem("sessoes", JSON.stringify(this.listaSessoes));
    }

    carregarSessoesDoLocalStorage() {
        const sessoesSalvas = localStorage.getItem("sessoes");
        if (sessoesSalvas) {
            this.listaSessoes = JSON.parse(sessoesSalvas);
            this.atualizarTabela();
        }
    }

    atualizarTabela() {
        const tabelaSessoes = document.getElementById("sessoes-tbody");
        tabelaSessoes.innerHTML = ""; // Limpa a tabela antes de atualizar

        this.listaSessoes.forEach((sessoes) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${sessoes.id}</td>
                <td>${sessoes.tituloFilme}</td>
                <td>${sessoes.nomeSala}</td>
                <td>${sessoes.dataHora}</td>
                <td>${sessoes.valor}</td>
                <td>${sessoes.idioma}</td>
                <td>${sessoes.formato}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${sessoes.id}">
                    <i class="bi bi-pencil-square"></i>
                    </button>
                    &nbsp;
                    <button class="btn btn-danger btn-sm btn-excluir" data-id="${sessoes.id}">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>`;
            tabelaSessoes.appendChild(tr);
        });
    }

}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const sessoesController = new SessoesController();
    window.sessoesController = sessoesController; // Exposição global, se necessário
  });
