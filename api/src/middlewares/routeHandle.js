import { routes } from "../routes.js"

export function rounteHandler(request, response) {
    const route = routes.find((route) => {
        return route.method === request.method && route.path.test(request.url)
    })

    if (route) {
        const routeParams = request.url.match(route.path)
        const { ...params } = routeParams.groups
        request.params = params
        return route.handler(request, response)
    } else {
        return response.writeHead(404).end("Rota não encontrada")
    }
}