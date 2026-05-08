class LoginPage {
  visitar() {
    cy.visit('/');
  }

  preencherEmail(email) {
    cy.get('input[id="email"]').type(email);
  }

  preencherSenha(senha) {
    cy.get('input[id="password"]').type(senha);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  confirmarModal() {
    cy.contains('Continuar').click();
  }

  get email() {
    return cy.get('field[name="email"]');
  }

  get senha() {
    return cy.get('field[name="password"]');
  }
}

export default new LoginPage();