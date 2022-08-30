import { faker } from '@faker-js/faker';
const cpf = require('gerador-validador-cpf')

export default {
    gerarDados: ()=>{
        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()
        let email = faker.internet.email(nome, sobrenome, 'buildbox.com.br')
        let dados = {
            nomeCompleto: `${nome} ${sobrenome}`,
            cpf: cpf.generate(),
            email: `${email}`,
            whatsapp: "11999999999",
            address: {
                postalcode: "13092-117",
                street: "Rua Augusto César de Andrade",
                number: "1567",
                details: " ",
                district: "Nova Campinas",
                city_state: "Campinas/SP"
            },
            metodoEntrega: "Moto",
            cnh: "images/cnh.jpg"
        }
        return dados
    }
}