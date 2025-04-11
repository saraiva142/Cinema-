export class Ingresso {
    constructor(id, sessaoId, nomeCliente, cpfCliente, assento, pagamento) {
        this.id = id;
        this.sessaoId = sessaoId; // ID da sessão associada
        this.nomeCliente = nomeCliente;
        this.cpfCliente = cpfCliente;
        this.assento = assento; // Assento reservado
        this.pagamento = pagamento; // Método de pagamento
    }

    getId() {
        return this.id;
    }
    getSessaoId() {
        return this.sessaoId;
    }
    getNomeCliente() {
        return this.nomeCliente;
    }
    getCpfCliente() {
        return this.cpfCliente;
    }
    getAssento() {
        return this.assento;
    }
    getPagamento() {
        return this.pagamento;
    }
    setId(id) {
        this.id = id;
    }
    setSessaoId(sessaoId) {
        this.sessaoId = sessaoId;
    }
    setNomeCliente(nomeCliente) {
        this.nomeCliente = nomeCliente;
    }
    setCpfCliente(cpfCliente) {
        this.cpfCliente = cpfCliente;
    }
    setAssento(assento) {
        this.assento = assento;
    }
    setPagamento(pagamento) {
        this.pagamento = pagamento;
    }
    
    toString() {
        return `Ingresso [ID: ${this.id}, Sessão ID: ${this.sessaoId}, Nome: ${this.nomeCliente}, CPF: ${this.cpfCliente}, Assento: ${this.assento}, Pagamento: ${this.pagamento}]`;
    }
}