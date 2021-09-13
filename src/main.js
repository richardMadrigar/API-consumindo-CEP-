'use strict';


const eNumero = (numero) => /^[0-9]+$/.test(numero); //verificando se todos são numeros

const cepValido = (cep) => cep.length == 8 && eNumero(cep); //verificando se tem 8 digitos


const pesquisarCep = async () => {
    limparFormulario(); //funcao para limpar toda vez que digitar alguma coisa 

    const cep = document.getElementById('cep').value //pegando o valor do input do cep
    const url = `https://viacep.com.br/ws/${cep}/json/`; //passando a variavel para dentro do link

    if (cepValido(cep)) {
        const dados = await fetch(url) //await aguardando resolver o URL
        const endereco = await dados.json() //transformando em um JSON

        if (endereco.hasOwnProperty("erro")) { // se a um elemento com o "erro"
            document.getElementById('endereco').value = "CEP não encontrado" //caso invalido

        } else {
            preencherFormulario(endereco); //chamando uma funcao e mandando endereço como um argumento
        }
    } else {
        document.getElementById('endereco').value = "CEP não encontrado" //caso invalido
    }
}


//TRABALHANDO COM A DOM 
const limparFormulario = () => {
    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}


document.getElementById('cep') //pegando o id CEP
    .addEventListener('focusout', pesquisarCep); //add o event ao sair do focus => pesquisarCep()



//redirecionando para o Google Maps
const pesquisar = () => {
    const cep = document.getElementById('cep').value //pegando o valor do input

    open( `https://www.google.com/maps/place/${cep}`);
}

document.getElementById('button').addEventListener('click', pesquisar);