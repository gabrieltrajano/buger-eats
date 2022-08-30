describe('Página Inicial', () => {
  beforeEach(()=>{
    cy.visit('/')
  })
  it('Deve exibir a chamada da página inicial', () => {
    cy.get("#page-home h1")
      .should('be.visible')
      .should('have.text', 'Seja um parceiro entregador pela Buger Eats')
  })
  it('Deve redirecionar para o cadastro', () => {
    cy.contains('a[href="/deliver"]', 'Cadastre-se')
      .should('be.visible')
  })
})