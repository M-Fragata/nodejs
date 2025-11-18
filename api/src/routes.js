import { parseRoutePath } from "./utils/parseRoutePath.js"

export const routes = [
    {
        method: "GET",
        path: "/schedules",
        handler: ({ request, response, database }) => {           
            const schedules = database.select("schedules")
            return response.writeHead(200).end(JSON.stringify(schedules))
        }
    },
    {
        method: "POST",
        path: "/schedules",
        handler: ({ request, response, database }) => {

            const { name, date, hour} = request.body

            database.insert("schedules", {name, date, hour})
            // request.body Disponível pelo middle
            // Necessário transformar o arquivo formato json para string utilizando JSON.stringify()
            return response.writeHead(201).end()
        }
    },
        {
        method: "DELETE",
        path: "/schedules/:id",
        handler: ({ request, response }) => {
            return response.writeHead(200).end("Produto removido com ID: " + request.params.id)
        }
    }
].map((route) => ({
    ...route,
    path: parseRoutePath(route.path),
}))