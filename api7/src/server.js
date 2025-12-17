import http from "node:http"
import { dataBase } from "./database.js"


const port = 3000

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method === "GET" && url === "/test") {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        return res
            .writeHead(200, { "Content-type": "application/json" })
            .end(JSON.stringify({ status: "Online" }))
    } else {
        return res
            .writeHead(404, { "Content-type": "application/json" })
            .end(JSON.stringify({ error: "Página não encontrada" }))
    }

})

const startServer = () => {
    server.listen(port, () => {

        dataBase()
        console.log("Servidor rodando")
    })
}

startServer()