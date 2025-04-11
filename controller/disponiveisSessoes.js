class SessoesDisponiveisController {
  constructor() {
    this.listaSessoesDisponiveis = []; // Lista de sessões disponíveis
    this.idEmEdicao = null; // ID da sessão que está sendo editada
    this.init();
  }

  init() {
    this.carregarSessoesNaPagina();
  }

  carregarSessoesNaPagina() {
    const sessoesSalvas = localStorage.getItem("sessoes");

    if (sessoesSalvas) {
        const listaSessoes = JSON.parse(sessoesSalvas);

        const sessoesContainer = document.getElementById("sessoesDisponiveis");
        sessoesContainer.innerHTML = ""; // Limpa o container antes de adicionar os cards

        // Cria os cards para cada sessão
        listaSessoes.forEach(sessao => {
            const card = document.createElement("div");
            card.className = "card text-bg-transparent mb-3";
            card.style = "max-width: 350px; background-color: rgba(0, 0, 0, 0.1); border: none;";

            card.innerHTML = `
                <div class="row g-0">
                    
                    <div class="col-md-8">
                        <div class="card-body" style="background-color: transparent;">
                            <h4 class="card-title fw-bold" style="color: black">${sessao.tituloFilme}</h4>
                            <p class="card-text" style="color: black"><strong>Sala:</strong> ${sessao.nomeSala}</p>
                            <p class="card-text fs-6" style="color: black"><strong>Data/Hora:</strong> ${sessao.dataHora}</p>
                            <p class="card-text fs-6" style="color: black"><strong>Preço:</strong> R$${sessao.valor}</p>
                            <button type="button" class="btn btn-light"><a href="../ingressos.html" style="text-decoration:none ; color: black">Comprar Ingresso</a></button>
                        </div>
                    </div>
                </div>
            `;

            sessoesContainer.appendChild(card);
        });
    } else {
        // Caso não haja sessões, exibe uma mensagem padrão
        const sessoesContainer = document.getElementById("sessoesDisponiveis");
        sessoesContainer.innerHTML = "<p>Nenhuma sessão disponível no momento.</p>";
    }
}


}

// Inicializa o FilmeController quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    const sessoesDisponiveisController = new SessoesDisponiveisController();
    window.sessoesDisponiveisController = sessoesDisponiveisController; // Exposição global, se necessário
  });