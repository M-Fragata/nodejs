import http from "node:http"
import { database } from "./middlewares/database.js"

const port = 3330

const server = http.createServer((req, res) => {

})

const startServer = async () => {

    await database()

    server.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
    })
}

startServer()