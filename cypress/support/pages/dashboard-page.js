class DashboardPage {
  // Elementos
  get linkMenuCampanha() {
    return cy.get('a[routerlink="/dashboard/campanha"]');
  }

  get linkBancoDeDados() {
    return cy.get('a').contains('Bancos de dados');
  }

  get btnCriar() {
    return cy.get('button').contains('Criar');
  }

  get btnRecarregar() {
    return cy.get(':nth-child(2) > [variant="icon"]');
  }

  get btnSalvar() {
    return cy.get('button').contains('Salvar');
  }

  get btnExibirArquivados() {
    return cy.get('.py-1 > :nth-child(1) > .justify-center');
  }

  get inputPesquisa() {
    return cy.get('input[placeholder="Pesquisar"]');
  }

  get inputNomeBanco() {
    return cy.get('input[placeholder="Nome do item"]');
  }

  get btnArquivar() {
    return cy.get('button[title="Arquivar"]');
  }

  get tabelaBancos() {
    return cy.get('table.w-full');
  }

  // Ações
  navegarParaBancoDeDados() {
    this.linkMenuCampanha.click();
    this.linkBancoDeDados.click();
  }

  criarNovoBanco(nome) {
    this.btnCriar.click();
    this.inputNomeBanco.type(nome);
    this.btnSalvar.click();
  }
}

export default new DashboardPage();