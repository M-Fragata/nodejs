const API_BASE_URL = "http://localhost:3333"


async function testAPI() {

    console.log("Tentando conexão com Backend...")

    const response = await fetch(`${API_BASE_URL}/test`, {method: "GET"})

    const data = await response.json()

    console.log("Conexão bem sucedida, Resposta", data)

    return data
}

testAPI()