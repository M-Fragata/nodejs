import { accessSync } from "node:fs"
import http, { METHODS } from "node:http"
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js"
import { buffer } from "node:stream/consumers"

const server = http.createServer(async(request, response) => {

    const {method, url} = request

    await jsonBodyHandler(request, response)

    if(method === "GET" && url === "/products") {
        return response.writeHead(200).end('Lista de produtos!')

    } else if (method === "POST" && url === "/products") {
        console.log(request.body)
        return response.writeHead(201).end('Produto cadastrado!')

    } else {

        return response.writeHead(404).end('Rota não encontrada!')
    } 

    
})

server.listen(3333)