export class Sessoes {
    // O filme e a sala vou ter que pegar la na lista de filmes e salas
    constructor(id, filmeId, salaId, dataHora, valor, idioma, formato, tituloFilme, nomeSala) {
        this.id = id;
        this.filmeId = filmeId;
        this.salaId = salaId;
        this.dataHora = dataHora;
        this.valor = valor;
        this.idioma = idioma;
        this.formato = formato;
        this.tituloFilme = tituloFilme; // Novo campo
        this.nomeSala = nomeSala;       // Novo campo
    }

    getId() {
        return this.id;
    }
    getFilmeId() {
        return this.filmeId;
    }
    getSalaId() {
        return this.salaId;
    }
    // getFilme() {
    //     return this.filme;
    // }
    // getSala() {
    //     return this.sala;
    // }
    getData() {
        return this.data;
    }
    getPreco() {
        return this.preco;
    }
    getIdioma() {
        return this.idioma;
    }
    getFormato() {
        return this.formato;
    }

    setId(id) {
        this.id = id;
    }
    setFilmeId(filmeId) {
        this.filmeId = filmeId;
    }
    setSalaId(salaId) {
        this.salaId = salaId;
    }
    // setFilme(filme) {
    //     this.filme = filme;
    // }
    // setSala(sala) {
    //     this.sala = sala;
    // }
    setData(data) {
        this.data = data;
    }
    setPreco(valor) {
        this.valor = valor;
    }
    setIdioma(idioma) {
        this.idioma = idioma;
    }
    setFormato(formato) {
        this.formato = formato;
    }
    toString() {
        return `Sessao: ${this.tituloFilme}, Sala: ${this.nomeSala}, Data e Hora: ${this.dataHora}, valor: ${this.valor}, Idioma: ${this.idioma}, Formato: ${this.formato}, ID: ${this.id}`;
    }
}