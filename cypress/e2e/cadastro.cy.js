import Cadastro from '../pages/Cadastro'
import formularioFactory from '../factories/formularioFactory'
import mensagensAlerta from '../fixtures/data/mensagensAlerta'

describe('Página de Cadastro', () => {
	beforeEach(()=>{
		cy.visit('/deliver')
	})
	it('Deve exibir o título do formulário', () => {
		cy.contains('h1', 'Cadastre-se para fazer entregas')
			.should('be.visible')
	})

	it('Deve validar o CPF', () => {
		cy.get('input[name=cpf]')
			.type('44444444444{enter}')
		cy.contains('.alert-error', 'Oops! CPF inválido')
			.should('be.visible')
	})

	it('Deve validar o formato do WhatsApp', () => {
		cy.get('input[name="whatsapp"]')
			.type('naoeumnumero{enter}')
		cy.contains('.alert-error', 'Oops! Whatsapp com formato incorreto')
			.should('be.visible')
	});

	it('Deve validar o formato do CEP', () => {
		cy.get('input[name="postalcode"]').type('261-380')
		cy.get('input[type="button"][value="Buscar CEP"]').click()
		cy.contains('.alert-error', 'Informe um CEP válido')
			.should('be.visible')
	})

	it('Deve selecionar apenas um método de entrega', () => {
		cy.contains('.delivery-method li', 'Moto').click()
		cy.contains('.delivery-method li', 'Bicicleta').click()
		Cadastro.enviarFormulario()
		Cadastro.alertaEsperado('Oops! Selecione apenas um método de entrega')
	})
		
	it('Deve voltar para Home', () => {
		cy.contains('a[href="/"]', 'Voltar para home').click()
		cy.location('pathname').should('eq', '/')
	})

	context('Campos obrigatórios:', ()=>{
		before( ()=>{
			cy.visit('/deliver')
		})
		
		mensagensAlerta.forEach( (campoEMensagem)=>{
			it(`${campoEMensagem.campo} não pode ser vazio`, ()=>{
				Cadastro.enviarFormulario()
				Cadastro.alertaEsperado(campoEMensagem.mensagemAlerta)
			})
		})
	})

	it('Deve cadastrar com sucesso', () => {
		let dadosEntregador = formularioFactory.gerarDados()
		Cadastro.preencherFormulario(dadosEntregador)
		Cadastro.enviarFormulario()
		cy.contains('.swal2-popup .swal2-html-container', 'Recebemos os seus dados')
		Cadastro.fecharModalDeSucesso()
		cy.location('pathname').should('eq', '/')
	})

})