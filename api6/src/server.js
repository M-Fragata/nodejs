import http from "node:http"
import { dataBase } from "./database.js"
import { Schedules } from "./schedule.js"

const port = 3000

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    if (method === "GET" && url === "/schedules") {

        try {
            const schedules = await Schedules.find()

            res.writeHead(200, { "Content-type": "application/json" })
            return res.end(JSON.stringify(schedules))
        } catch (error) {
            console.log(error)

            res.writeHead(400, { "Content-type": "application/json" })
            return res.end(JSON.stringify({ error: "Erro ao encontrar a lista de agendamentos" }))
        }

    } else if (method === "POST" && url === "/schedules") {

        let body = {}

        try {

            const buffers = []

            for await (const chunk of req) {
                buffers.push(chunk)
            }

            body = JSON.parse(Buffer.concat(buffers).toString())

            const newSchedules = await Schedules.create(body)

            res.writeHead(201, { "Content-type": "application/json" })
            return res.end(JSON.stringify(newSchedules))
        } catch (error) {
            console.log(error)

            res.writeHead(400, { "Content-type": "application/json" })
            return res.end(JSON.stringify({ error: "Não foi possível gerar novo agendamento" }))
        }

    } else if (method === "DELETE" && url.startsWith("/schedules/")) {

        try {
            const [, , id] = url.split("/")

            const deleteSchedule = await Schedules

        } catch (error) {

        }




    } else {
        res.writeHead(404, { "Content-type": "application/json" })
        return res.end(JSON.stringify({ error: "URL não encontrada" }))
    }

})

const startServer = async () => {
    await dataBase()
    server.listen(port, () => console.log("Iniciando servidor"))
}
startServer()