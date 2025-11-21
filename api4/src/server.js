import http from "node:http"
import { mongooseDB } from "./dataBase.js"
import { User } from "./users.js"

const port = 3333

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    if (method === "GET" && url === "/users") {
        try {
            const users = await User.find()

            res.writeHead(200, { "Content-type": "application/json" })
            return res.end(JSON.stringify(users))
        } catch (error) {
            res.writeHead(400, { "Content-type": "application/json" })
            return res.end(JSON.stringify({ error: "Erro a buscar os usuários" }))
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
            return res.end(JSON.stringify({ error: "Faltam dados" }))
        }

        try {
            const newUser = await User.create(body)

            res.writeHead(201, { "Content-type": "application/json" })
            return res.end(JSON.stringify(newUser))
        } catch (error) {
            res.writeHead(400, { "Content-type": "application/json" })
            return res.end(JSON.stringify({ error: "Não foi possível criar novo usuário" }))
        }

    } else if (method === "DELETE") {
        if (url.startsWith("/users/")) {
            const [, , id] = url.split("/")
            try {
                const deletedUser = await User.findByIdAndDelete(id)

                if (!deletedUser) {
                    res.writeHead(404, { "content-type": "application/json" })
                    return res.end(JSON.stringify({ error: "Usuário não encontrado" }))
                }

                res.writeHead(204)
                return res.end()
            } catch (error) {
                res.writeHead(400, { "content-type": "application/json" })
                return res.end(JSON.stringify({ error: "Não foi possível deletar o usuário" }))
            }
        } else {
            res.writeHead(400, { "content-type": "application/json" })
            return res.end(JSON.stringify({ error: "ID inválido ou falha no processamento da requisição." }))
        }

    } else if (method === "PUT") {
        if (url.startsWith("/users/")) {

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

            const [, , id] = url.split("/")

            try {
                const editedUSer = await User.findByIdAndUpdate(id, body, {new: true})

                if (!editedUSer) {
                    res.writeHead(404, { "Content-type": "application/json" })
                    return res.end(JSON.stringify({ error: "Usuário não existe" }))
                }

                res.writeHead(200, { "Content-type": "application/json" })
                return res.end(JSON.stringify(editedUSer))
            } catch (error) {
                res.writeHead(400, { "Content-type": "application/json" })
                return res.end(JSON.stringify({ error: "Não foi possível alterar usuário" }))
            }
        } else {
            console.error("Não foi possível encontrar a URL", error.message)
            res.writeHead(404, { "Content-type": "application/json" })
            return res.end(JSON.stringify({ error: "URL não encontrada" }))
        }
    } else {
        res.writeHead(404, { "Content-type": "application/json" })
        return res.end(JSON.stringify({ error: "Não foi possível realizar tal ação" }))
    }
})


const serverStart = async () => {
    try {
        await mongooseDB()
        server.listen(port, () => console.log("Servidor rodando"))
    } catch (error) {
        console.error("Deu ruim")
    }
}
serverStart()