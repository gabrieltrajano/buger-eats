class Cadastro{
    preencherFormulario(dadosEntregador){
        cy.get('input[name="name"').type(dadosEntregador.nomeCompleto)
        cy.get('input[name="cpf"').type(dadosEntregador.cpf)
        cy.get('input[name="email"').type(dadosEntregador.email)
        cy.get('input[name="whatsapp"').type(dadosEntregador.whatsapp)
    
        cy.get('input[name="postalcode"]').type(dadosEntregador.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()
    
        cy.get('input[name="address-number"]').type(dadosEntregador.address.number)
        cy.get('input[name="address-details"]').type(dadosEntregador.address.details)
    
        cy.get('input[name="address"]').should('have.value', dadosEntregador.address.street)
        cy.get('input[name="district"]').should('have.value', dadosEntregador.address.district)
        cy.get('input[name="city-uf"]').should('have.value', dadosEntregador.address.city_state)
    
        cy.contains('.delivery-method li', dadosEntregador.metodoEntrega).click()
        
        cy.get('.dropzone').selectFile('cypress/fixtures/' + dadosEntregador.cnh, { action: 'drag-drop' })
    }
    enviarFormulario(){
        cy.get('button.button-success').click()
    }
    fecharModalDeSucesso(){
        cy.get('.swal2-confirm').click()
    }
    alertaEsperado(mensagemAlerta){
        cy.contains('.alert-error', mensagemAlerta).should('be.visible')
    }
}

export default new Cadastro