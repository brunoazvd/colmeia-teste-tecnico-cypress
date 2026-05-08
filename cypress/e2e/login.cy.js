import LoginPage from '@pages/login-page';
import casosEmailInvalido from '@fixtures/emails-invalidos.json';

describe('Login - Desafio Colmeia QA', () => {
  beforeEach(() => {
    LoginPage.visitar();
  });

  it('Deve realizar login com sucesso', () => {
    cy.fixture('user').then((user) => {
      LoginPage.preencherEmail(user.email);
      LoginPage.preencherSenha(user.senha);
      LoginPage.submit();

      LoginPage.confirmarModal();

      // Check: Validar se fomos redirecionados para o dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('Candidato').should('be.visible');
    });
  });

  it('Deve validar que o link "Esqueceu sua senha" é inoperante', () => {
    cy.url().then(prevUrl => {
      cy.contains('Esqueceu sua senha?').click({ force: true });

      // Check: Validar se URL permanece a mesma
      cy.url().should('eq', prevUrl);
    });
  });

  it('Deve exibir erro ao tentar submeter formulário vazio', () => {
    LoginPage.submit();

    // Check: Validar se a mensagem de erro aparece
    LoginPage.email.should('contain', 'Usuário ou senha inválidos');
    LoginPage.senha.should('contain', 'Usuário ou senha inválidos');
  })

  it('Deve exibir erro ao inserir credenciais inexistentes', () => {
    LoginPage.preencherEmail('inexistente@teste.com');
    LoginPage.preencherSenha('errada123');
    LoginPage.submit();

    // Check: Validar se a mensagem de erro aparece
    LoginPage.email.should('contain', 'Usuário ou senha inválidos');
    LoginPage.senha.should('contain', 'Usuário ou senha inválidos');
  });

  casosEmailInvalido.forEach(caso => {
    it(`Deve exibir erro ao inserir email invalido: ${caso.nome}`, () => {
      LoginPage.preencherEmail(caso.email);

      // Check: Validar se a mensagem de erro aparece
      LoginPage.email.should('contain', 'Email inválido')
    })
  })
})