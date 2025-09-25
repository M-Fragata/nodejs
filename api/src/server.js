import http, { METHODS } from "node:http"

const server = http.createServer((request, response) => {

    const {method, url} = request

    if(method === "GET" && url === "/products") {
        return response.writeHead(200).end('Lista de produtos!')
    } else if (method === "POST" && url === "/products") {
        return response.writeHead(201).end('Produto cadastrado!')
    } else {
        return response.writeHead(404).end('Rota não encontrada!')
    } 

    
})

server.listen(3333)