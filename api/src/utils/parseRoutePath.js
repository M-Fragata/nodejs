export function parseRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g

    const Params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_+])")

    const pathRegex = new RegExp(Params)

    return pathRegex
}