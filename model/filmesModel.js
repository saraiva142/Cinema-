export class Filme {
  constructor(id, titulo, genero, descricao, classificacaoIndicativa, duracao, data ) {
    this.id = id;
    this.titulo = titulo;
    this.genero = genero;
    this.descricao = descricao;
    this.classificacaoIndicativa = classificacaoIndicativa;
    this.duracao = duracao;
    this.data = data;
  }
  
  getId() {
    return this.id;
  }
  getTitulo() {
    return this.titulo;
  }
  
  getGenero() {
    return this.genero;
  }
  getDescricao() {
    return this.descricao;
  }
  getClassificacaoIndicativa() {
    return this.classificacaoIndicativa;
  }
  getDuracao() {
    return this.duracao;
  }
  getData() {
    return this.data;
  }
  setId(id) {
    this.id = id;
  }
  setTitulo(titulo) {
    this.titulo = titulo;
  }
  setGenero(genero) {
    this.genero = genero;
  }
  setDescricao(descricao) {
    this.descricao = descricao;
  }
  setClassificacaoIndicativa(classificacaoIndicativa) {
    this.classificacaoIndicativa = classificacaoIndicativa;
  }
  setDuracao(duracao) {
    this.duracao = duracao;
  }
  setData(data) {
    this.data = data;
  }
  toString() {
    return `Filme: ${this.titulo}, Genero: ${this.genero}, Descricao: ${this.descricao}, Classificacao Indicativa: ${this.classificacaoIndicativa}, Duracao: ${this.duracao}, Data: ${this.data}, ID: ${this.id}`;
  }
}