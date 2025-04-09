export class Salas {
    constructor(id, nome, capacidade, tipo) {
        this.id = id;
        this.nome = nome;
        this.capacidade = capacidade;
        this.tipo = tipo;
    }

    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getCapacidade() {
        return this.capacidade;
    }
    getTipo() {
        return this.tipo;
    }
    setId(id) {
        this.id = id;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setCapacidade(capacidade) {
        this.capacidade = capacidade;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    toString() {
        return `Sala: ${this.nome}, Capacidade: ${this.capacidade}, Tipo: ${this.tipo}, ID: ${this.id}`;
    }
}