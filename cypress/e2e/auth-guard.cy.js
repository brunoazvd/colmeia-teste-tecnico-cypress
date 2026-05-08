describe("Autenticação - Proteção de Rotas Internas", () => {
  it('Deve impedir acesso às páginas internas sem autenticação', () => {
    cy.visit('/dashboard/campanha/banco-de-dados');

    // O esperado seria um redirecionamento para o login ou erro 401/403, como o site está quebrado, ele vai permitir o acesso
    cy.url().should('not.include', '/dashboard');
  });
})