import { json } from "node:stream/consumers"

export async function jsonHandler(request, response) {

    const buffers = []
    //Recuperando os pedaços(chunck) e remontando utilizando o Buffer.concat().toString()
    for await (const chunk of request) {
        buffers.push(chunk)
    }

    try {
        //Concatena os chuncks e converte para string. Em seguida, converte a string para json utilizando o JSON.parse()
        request.body = JSON.parse(Buffer.concat(buffers).toString()) 
    } catch (error) {
        request.body = null        
    }

    // Define o header de resposta como JSON.
    response.setHeader("Content-Type", "application/json")
}
