/*
const pets = [
    { nome: "Rex", tipo: "cachorro", idade: 5 },
    { nome: "Mia", tipo: "gato", idade: 2 },
    { nome: "Bob", tipo: "cachorro", idade: 10 },
    { nome: "Preta", tipo: "passaro", idade: 1 },
    { nome: "Charlotte", tipo: "gato", idade: 3 },
    { nome: "Shubakira", tipo: "cachorro", idade: 6 }
]
*/
// inicio do 1º exercicio
/*
const pets2 = pets.map((pet => ({nome: pet.nome})))

console.log(pets2)
*/
// Fim do 1º exercicio

// inicio do 2º exercicio
/*
const findPet = pets.find((pet => (pet.nome === "Mia")))
console.log(findPet)
*/


// Fim do 2º exercicio

// inicio do 3º exercicio
   /*
const petCachorro = pets.filter((pet => (pet.tipo === "cachorro")))
console.log(petCachorro)

 */


// Fim do 3º exercicio

// inicio do 4º exercicio
/*
const SumPetsAge = pets.reduce((contador, pet) => {
    return contador + pet.idade
}, 0)

console.log(SumPetsAge)
*/
// Fim do 4º exercicio

// inicio do 5º exercicio
/*
const sumNamePets = pets.reduce((acc, pet, index) => {
    return index === 0 ? pet.nome: acc + ", " + pet.nome
}, "")
console.log(sumNamePets)
*/
// Fim do 5º exercicio

// inicio do 6º exercicio
/*
const NamePetsPlus3 = pets.filter((pet) => pet.idade > 3).reduce((acc, pet) => {
    return acc + pet.idade
}, 0)

console.log(NamePetsPlus3)
*/
// Fim do 6º exercicio
/*
const pedidos = [
    { id: 101, itens: [{ nome: "Mouse", preco: 80 }, { nome: "Teclado", preco: 150 }] },
    { id: 102, itens: [{ nome: "Monitor", preco: 900 }] },
    { id: 103, itens: [{ nome: "Cabo HDMI", preco: 30 }, { nome: "Adaptador", preco: 20 }] }
]

const pedidos2 = pedidos.map((pedido => {
    const itenspreco = pedido.itens

    const somaPreco = itenspreco.reduce((acc ,item) => {
        return acc + item.preco
    }, 0)

    return {
        id: pedido.id,
        total: somaPreco
    }

}))



const funcionarios = [
    { nome: "Ana", departamento: "TI", salario: 5000, projetos: ["Site", "App"] },
    { nome: "Beto", departamento: "RH", salario: 4500, projetos: ["Treinamento"] },
    { nome: "Caio", departamento: "TI", salario: 7000, projetos: ["Segurança", "App", "Banco de Dados"] },
    { nome: "Duda", departamento: "TI", salario: 3000, projetos: [] }
];

const promoFunc = funcionarios.filter((funcionario) => funcionario.departamento === "TI" && funcionario.projetos.length > 1).map((funcionario) => ({nome: funcionario.nome}))


const transacoes = [
    { categoria: "Eletrônicos", valor: 100 },
    { categoria: "Livros", valor: 50 },
    { categoria: "Eletrônicos", valor: 300 },
    { categoria: "Livros", valor: 20 },
    { categoria: "Casa", valor: 150 }
];

const resumo = transacoes.reduce((acc, transacao) => {
    const { categoria, valor} = transacao

    if (!acc[categoria]) {
        acc[categoria] = 0
    }

    acc[categoria] += valor

    return acc
}, {})

console.log(resumo)
*/

const estoque = [
    { id: 1, nome: "Camiseta", qtd: 5, preco: 50 },
    { id: 2, nome: "Calça", qtd: 2, preco: 120 },
    { id: 3, nome: "Meia", qtd: 10, preco: 15 },
    { id: 4, nome: "Tênis", qtd: 0, preco: 300 } // ESGOTADO
];

const carrinho = [
    { id: 1, qtdDesejada: 2 },
    { id: 3, qtdDesejada: 5 },
    { id: 4, qtdDesejada: 1 }
];

const algo = carrinho.map((carro) => {

    console.log(estoque.find((estoque) => estoque.id === carro.id).filter((estoque) => estoque.qtd > 0))
    
})

