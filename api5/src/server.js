import http from "node:http"
import { mongooseDB } from "./dataBase.js"
import { User } from "./users.js"

const port = 3333

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    // Headers de CORS e tratamento options
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (method === "OPTIONS") {
        res.writeHead(204)
        return res.end()
    }


    if (method === "GET" && url === "/users") {

        try {
            const users = await User.find({})

            res.writeHead(200, { "Content-type": "application/json" })
            return res.end(JSON.stringify(users))
        } catch (error) {
            console.error("Erro no GET", error.message)
            return res.end(JSON.stringify({ error: "Erro interno do servidor ao buscar usuários" }))
        }

    } else if (method === "POST" && url === "/users") {

        let body = {}

        try {
            let buffers = []
            for await (const chunk of req) {
                buffers.push(chunk)
            }

            body = JSON.parse(Buffer.concat(buffers).toString())

        } catch (error) {
            res.writeHead(400, { "Content-type": "application/json" })
            return res.end(JSON.stringify({ error: "Erro no body da requisição" }))
        }

        try {
            const newUser = await User.create(body)

            res.writeHead(201, { "Content-type": "application/json" })
            return res.end(JSON.stringify(newUser))
        } catch (error) {
            res.writeHead(400, { "Content-type": "application/json" })
            return res.end(JSON.stringify({ error: "Erro ao criar novo usuário" }))
        }

    } else if (method === "DELETE") {

        if (url.startsWith("/users/")) {
            const [, , id] = url.split("/")
            try {
                const deletedUser = User.findByIdAndDelete(id)

                res.writeHead(204, { "Content-type": "application/json" })
                return res.end()
            } catch (error) {
                res.writeHead(404, { "Content-type": "application/json" })
                return res.end({ error: "Não foi possível deletar o usuário" })
            }
        } else {
            res.writeHead(400, { "Content-type": "application/json" })
            return res.end({ error: "URL não encontrada" })
        }

    } else {
        console.log("Não foi possível realizar a ação")

        res.writeHead(400, { "Content-type": "application/json" })
        return res.end(JSON.stringify({ error: "Não foi possível realizar a ação" }))

    }

})

const startServer = async () => {
    await mongooseDB()

    server.listen(port, () => {
        console.log("servidor rodando")
    })
}

startServer()