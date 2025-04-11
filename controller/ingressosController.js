import { Ingresso } from "../model/ingressoModel.js";

class IngressoController {
    constructor() {
        this.listaIngressos = [];
        this.idEmEdicao = null; // ID do ingresso que está sendo editado
        this.init();
    }

    init() {
        const btnSalvarIngresso = document.getElementById("btn-salvar-ingresso");

        // Usando arrow function para preservar o contexto de `this`
        btnSalvarIngresso.addEventListener("click", (event) => {
            event.preventDefault(); // Evita comportamento padrão
            this.adicionarIngresso();
        });

        this.carregarIngressosDoLocalStorage();
        this.carregarSessoesNoSelect(); // Carrega sessões no select
    }

    carregarSessoesNoSelect() {
        const sessoesSalvas = localStorage.getItem("sessoes");
        const selectSessao = document.getElementById("inputSessao");
    
        if (sessoesSalvas) {
            const listaSessoes = JSON.parse(sessoesSalvas);
    
            // Limpa o select antes de adicionar as opções
            selectSessao.innerHTML = "";
    
            // Adiciona as sessões como opções no select
            listaSessoes.forEach(sessao => {
                const option = document.createElement("option");
                option.value = sessao.id; // ID da sessão
                option.textContent = `${sessao.tituloFilme} - ${sessao.nomeSala} - ${sessao.dataHora}`; // Formato desejado
                selectSessao.appendChild(option);
            });
        } else {
            // Caso não haja sessões, exibe uma mensagem padrão
            selectSessao.innerHTML = "<option disabled selected>Nenhuma sessão disponível</option>";
        }
    }

    adicionarIngresso() {
        const ingresso = this.criarIngressoDoFormulario();

        if (this.idEmEdicao) {
            // Atualiza ingresso existente
            const index = this.listaIngressos.findIndex(i => i.id === this.idEmEdicao);
            this.listaIngressos[index] = ingresso;
        } else {
            // Adiciona novo ingresso
            this.listaIngressos.push(ingresso);
        }

        // Salva no localStorage e atualiza a tabela
        this.salvarNoLocalStorage();
        this.atualizarTabela();
    }

    criarIngressoDoFormulario() {
        return new Ingresso(
            this.idEmEdicao || Date.now(),
            document.getElementById("inputSessao").value,
            document.getElementById("inputCliente").value,
            document.getElementById("inputCPF").value,
            document.getElementById("inputAssento").value,
            document.getElementById("inputPagamento").value
        );
    }

    salvarNoLocalStorage() {
        console.log("Salvando no localStorage:", this.listaIngressos); // Verifica os dados
        localStorage.setItem("ingressos", JSON.stringify(this.listaIngressos));
    }

    carregarIngressosDoLocalStorage() {
        const ingressosSalvos = localStorage.getItem("ingressos");
        if (ingressosSalvos) {
            this.listaIngressos = JSON.parse(ingressosSalvos);
            this.atualizarTabela();
        }
    }

    atualizarTabela() {
        const tabelaIngressos = document.getElementById("ingressos-tbody");
        tabelaIngressos.innerHTML = ""; // Limpa a tabela antes de atualizar

        this.listaIngressos.forEach((ingresso) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${ingresso.getId()}</td>
                <td>${ingresso.getSessaoId()}</td>
                <td>${ingresso.getNomeCliente()}</td>
                <td>${ingresso.getCpfCliente()}</td>
                <td>${ingresso.getAssento()}</td>
                <td>${ingresso.getPagamento()}</td>
            `;
            tabelaIngressos.appendChild(tr);
        });
    }

    
}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const ingressosController = new IngressoController();
    window.ingressosController = ingressosController; // Exposição global, se necessário
  });