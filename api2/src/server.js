import { error } from "node:console"
import http from "node:http"

const port = 3000

let users = [
    {
        id: 1,
        name: "joão"
    },
    {
        id: 2,
        name: "Matheus"
    },
    {
        id: 3,
        name: "Carlos"
    },
    {
        id: 4,
        name: "Magno"
    }
]


const server = http.createServer(async (req, res) => {

    const { method, url } = req

    if (method === "GET" && url === "/users") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
            .end(JSON.stringify(users))

    } else if (method === "POST" && url === "/users") {
        const buffers = []

        for await (const chunk of req) {
            buffers.push(chunk)
        }

        let body = {}

        try {
            body = JSON.parse(Buffer.concat(buffers).toString())
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" })
            return res.end("JSON inválido no corpo da requisição")
        }

        const newUser = {
            id: users.length + 1,
            ...body
        }
        users.push(newUser)

        res.writeHead(201, {
            "Content-Type": "application/json"
        })
            .end(JSON.stringify(newUser))
    } else if (method === "DELETE") {

        if (url.startsWith("/users/")) {

            const [, , idString] = url.split('/')
            const id = Number(idString)

            if (isNaN(id)) {
                res.writeHead(400, { "Content-Type": "application;json" })
                return res.end("ID inválido. Deve ser um número.")
            }

            try {
                const userIndex = users.findIndex((users) => users.id === id)

                if (userIndex === -1) {
                    res.writeHead(404, { "Content-Type": "application/json" }).end(JSON.stringify({ error: "Usuário não encontrado." }))
                } else {
                    users.splice(userIndex, 1)
                    res.writeHead(204)
                    return res.end()
                }

            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" })
                return res.end("Não foi possível deletar o usuário")
            }
        }


    } else if (method === "PUT") {

        const buffers = []

        for await (const chunk of req) {
            buffers.push(chunk)
        }

        let body = {}

        try {
            body = JSON.parse(Buffer.concat(buffers).toString())
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" })
            return res.end(JSON.stringify({ error: "Não foi possível alterar" }))
        }

        const [, , idString] = url.split("/")
        const id = Number(idString)

        if (isNaN(id)) {
            res.writeHead(400,{"content-Type": "application/json"})
            return res.end(JSON.stringify({ error: "ID inválido" }))
        }

        const userIndex = users.findIndex((users) => users.id === id)

        if (userIndex === -1) {
            res.writeHead(404, { "Content-Type": "application/json" })
            return res.end(JSON.stringify({ error: "Usuário não encontrado" }))
        } else {
            const updatedUser = {
                id,
                name: body.name
            }

            users[userIndex] = updatedUser

            res.writeHead(200, { "Content-Type": "application/json" })
            return res.end(JSON.stringify(updatedUser))
        }




    } else {
        res.writeHead(404, { "Content-Type": "application/json" })
        return res.end("Rota não encontrada")
    }

})

server.listen(port, () => console.log("Servidor rodando"))
