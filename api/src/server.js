import http from "node:http"
import { jsonHandler } from "./middlewares/jsonHandler.js"
import { rounteHandler } from "./middlewares/routeHandle.js"

const server = http.createServer(async (request, response) => {
    const { method, url } = request
    //return response.writeHead(200).end(`Método: ${method} | URL: ${url}`)
    //Aguardando o middleware montar a requisição
    await jsonHandler(request, response)
    //aguardando o middleware verificar o método e a rota para dar um response na request
    rounteHandler(request, response)

})
server.listen(3333)