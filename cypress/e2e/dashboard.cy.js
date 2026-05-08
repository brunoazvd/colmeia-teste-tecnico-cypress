import DashboardPage from '@pages/dashboard-page';
import LoginPage from '@pages/login-page';


describe('Dashboard - Banco de Dados', () => {
  beforeEach(() => {
    LoginPage.visitar();
    cy.fixture('user').then((user) => {
      LoginPage.preencherEmail(user.email);
      LoginPage.preencherSenha(user.senha);
      LoginPage.submit();
      LoginPage.confirmarModal();
    });
    DashboardPage.navegarParaBancoDeDados();
  });

  it('Deve criar um novo banco de dados e validar a listagem', () => {
    const nomeBanco = 'Automóveis 2026';
    DashboardPage.criarNovoBanco(nomeBanco);

    // Check: Validar se o banco aparece na tabela
    DashboardPage.tabelaBancos.should('contain', nomeBanco);
  });

  it('Deve filtrar os bancos de dados através da caixa de busca', () => {
    DashboardPage.criarNovoBanco('Mamíferos');
    DashboardPage.criarNovoBanco('Repteis');

    DashboardPage.inputPesquisa.type('Repteis');

    // Check: Deve mostrar Repteis e não mostrar Mamíferos
    DashboardPage.tabelaBancos.should('contain', 'Repteis');
    DashboardPage.tabelaBancos.should('not.contain', 'Mamíferos');
  });

  it('BUG - Deve validar que os dados NÃO persistem ao recarregar os dados', () => {
    const nomeBanco = 'Banco Volátil';
    DashboardPage.criarNovoBanco(nomeBanco);

    DashboardPage.btnRecarregar.click();

    // Check: Validar que o item sumiu (Evidência do Bug de Persistência)
    DashboardPage.tabelaBancos.should('not.contain', nomeBanco)
    cy.contains('Banco Volátil').should('not.exist');
    cy.contains('Nenhum banco de dados encontrado').should('be.visible');
  });

  it('BUG - Deve validar que itens arquivados não aparecem na listagem de arquivados', () => {
    const nomeArquivo = 'Banco para Arquivar';
    DashboardPage.criarNovoBanco(nomeArquivo);


    DashboardPage.btnArquivar.first().click();
    DashboardPage.btnExibirArquivados.click();

    // Check: Validar que o banco não é exibido nos arquivados.
    cy.contains('Itens Arquivados').should('exist');
    cy.contains(nomeArquivo).should('not.exist');
  });

  it('BUG - Deve validar que o último item não está visível no viewport devido à falta de scroll', () => {
    for (let i = 0; i < 30; i++) {
      DashboardPage.criarNovoBanco(`Banco ${i}`);
    }

    // Tenta forçar o scroll
    cy.contains('Banco 29').scrollIntoView();

    // Checagem de visibilidade real no viewport
    cy.contains('Banco 29').then(($el) => {
      const isVisible = Cypress.dom.isVisible($el[0]);
      expect(isVisible).to.be.false;
    });
  });

})