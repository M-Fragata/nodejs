export async function jsonBodyHandler(request, response){
    //Adicionar cada chunk
    const buffers = []


    //Coleta os chunks (pedaços) de dados da requisição
    for await (const chunk of request) {
        buffers.push(chunk)
    }

    try {
        //concatena os chunks e converte para string. Em seguida, converte a string para JSON.
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (error) {
        request.body = null
    }


    //Define o header de resposta com JSON
    response.setHeader("Content-type", "application/json")

}