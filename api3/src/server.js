import http from "node:http"
import { connectDB } from "./database.js"
import { user } from "./user.js"
import { error } from "node:console"

const port = 3333

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    if (method === "GET" && url === "/users") {

        try {
            const users = await user.find()

            res.writeHead(200, { "Content-Type": "application/json" })
            return res.end(JSON.stringify(users))
        } catch (error) {
            res.writeHead(400, { "Content-type": "application/json" })
            return res.end(JSON.stringify({ error: "Falha na busca de usuários" }))
        }

    } else if (method === "POST" && url === "/users") {
        //buffers será o array recepiente para receber os chunks (pedaços) enviados pela requisição (req)
        const buffers = []
        // Para cada chunk da requisição é adicionado no nosso array
        for await (const chunk of req) {
            buffers.push(chunk)
        }

        let body = {}

        try {
            // Buffer.concat(buffers) junta todos os chunks dentro do array e converte para uma string e no final o JSON.parse tranforma em json
            body = JSON.parse(Buffer.concat(buffers).toString())
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" })
            return res.end(JSON.stringify({ error: "JSON inválido no corpo da requisição." }))
        }

        try {
            const newUser = await user.create(body)

            res.writeHead(201, { "Content-Type": "application/json" })
            return res.end(JSON.stringify(newUser))
        } catch (error) {
            console.log("Erro ao criar usuário no DB:", error.message)

            res.writeHead(400, { "Content-Type": "application/json" })
            return res.end(JSON.stringify({ error: "Falha na criação" }))
        }

    } else if (method === "DELETE") {

        if (url.startsWith("/users/")) {
            const [, , id] = url.split("/")

            try {
                const deletedUser = await user.findByIdAndDelete(id)

                if (!deletedUser) {
                    res.writeHead(404, { "Content-type": "application/json" })
                    return res.end(JSON.stringify({ error: "Usuário não encontrado" }))
                }
                res.writeHead(204, { "Content-type": "application/json" })
                return res.end()

            } catch (error) {
                res.writeHead(400, { "content-type": "application/json" })
                return res.end(JSON.stringify({ error: "Não foi possível deletar o usuário" }))
            }
        }
    } else if (method === "PUT") {

        let buffers = []
        for await (const chunk of req) {
            buffers.push(chunk)
        }

        let body = {}

        try {
            // Buffer.concat(buffers) junta todos os chunks dentro do array e converte para uma string e no final o JSON.parse tranforma em json
            body = JSON.parse(Buffer.concat(buffers).toString())
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" })
            return res.end(JSON.stringify({ error: "JSON inválido no corpo da requisição." }))
        }

        if (url.startsWith("/users/")) {

            const [, , id] = url.split("/")

            try {
                const changedUser = await user.findByIdAndUpdate(id, body, { new: true })

                if(!changedUser){
                    res.writeHead(404, {"Content-type": "application/json"})
                    return res.end(JSON.stringify({error: "Usuário não encontrado!"}))
                }

                res.writeHead(200, { "Content-type": "application/json" })
                return res.end("Informações do usuário trocadas.")

            } catch (error) {

                res.writeHead(400, { "Content-type": "application/json" })
                return res.end(JSON.stringify({ error: "Não foi possível alterar o usuário" }))

            }
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" })
        return res.end(JSON.stringify({ error: "url não encontrada" }))
    }
})

const startServer = async () => {
    try {
        await connectDB()
        server.listen(port, () => {
            console.log(`API Server running on port ${port}`)
        })
    } catch (error) {
        console.error("Falha crítica ao inciciar a aplicação", error)
    }
}
startServer()