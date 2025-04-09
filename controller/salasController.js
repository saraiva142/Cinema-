import { Salas } from "../model/salasModel.js";

class SalasController {
    constructor(){
        this.listaSalas = [];
        this.idEmEdicao = null; // ID da sala que está sendo editada
        this.init();
    }

    init(){
        const btnSalvarSala = document.getElementById("btn-salvar-sala");

        // Usando arrow function para preservar o contexto de `this`
        btnSalvarSala.addEventListener("click", (event) => {
            event.preventDefault(); // Evita comportamento padrão
            this.adicionarSala();
        });

        this.carregarSalasDoLocalStorage();
    }

    adicionarSala(){

        const sala = this.criarSalaDoFormulario();

        if (this.idEmEdicao) {
            // Atualiza sala existente
            const index = this.listaSalas.findIndex(s => s.id === this.idEmEdicao);
            this.listaSalas[index] = sala;
        } else {
            // Adiciona nova sala
            this.listaSalas.push(sala);
        }

        // Salva no localStorage e atualiza a tabela
        this.salvarNoLocalStorage();
        this.atualizarTabela();
    }

    criarSalaDoFormulario(){
        return new Salas(
            this.idEmEdicao || Date.now(),
            document.getElementById("inputNomeSala").value,
            document.getElementById("inputCapacidadeSala").value,
            document.getElementById("inputTipo").value,
        );
    }

    salvarNoLocalStorage(){
        console.log("Salvando no localStorage:", this.listaSalas); // Verifica os dados
        localStorage.setItem("salas", JSON.stringify(this.listaSalas));
    }

    carregarSalasDoLocalStorage(){
        const salasSalvas = localStorage.getItem("salas");
        if (salasSalvas) {
            this.listaSalas = JSON.parse(salasSalvas);
            this.atualizarTabela();
        }
    }

    atualizarTabela(){
        const tabelaSalas = document.getElementById("salas-tbody"); 
        tabelaSalas.innerHTML = ""; // Limpa a tabela antes de atualizar

        this.listaSalas.forEach((sala) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${sala.id}</td>
                <td>${sala.nome}</td>
                <td>${sala.capacidade}</td>
                <td>${sala.tipo}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${sala.id}">
                    <i class="bi bi-pencil-square"></i>
                    </button>
                    &nbsp;
                    <button class="btn btn-danger btn-sm btn-excluir" data-id="${sala.id}">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>`;
            tabelaSalas.appendChild(tr);
        });

        this.adicionarEventosTabela();
        // Adiciona evento para o botão de editar
        tr.querySelector(".btn-editar").addEventListener("click", () => this.abrirModalEdicao(filme));
        tr.querySelector(".btn-excluir").addEventListener("click", () => this.abrirModalExcluir(filme.id));
    }
}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const salasController = new SalasController();
    window.salasController = salasController; // Exposição global, se necessário
  });