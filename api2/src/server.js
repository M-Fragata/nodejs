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
    }
]
console.log(users)

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

            const [, , id] = url.split('/')

            if (!isNaN(id)) {
                console.log(`ID encontrado: ${id}`)
            } else {
                console.log(`${id} não encontrado.`)
            }

            try {
                const userIndex = users.findIndex((users) =>  users.id === id)
                users.splice(userIndex, 1)
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" })
                return res.end("Não foi possível deletar o usuário")
            }
        }


    } else {
        res.writeHead(404, { "Content-Type": "application/json" })
        return res.end("Rota não encontrada")
    }

})

server.listen(port, () => console.log("Servidor rodando"))
