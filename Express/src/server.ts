import express, { Request, Response, NextFunction, response } from "express"
import { routes } from "./routes/index.js"

const PORT = 3333

const app = express()
app.use(express.json())

app.use(routes)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    /**
     * 400 (Bad Request): Erro do cliente
     * 500 (Internal Server Error): Erro interno do servidor
     */
    res.status(500).json({message: error.message})
})

app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT}`))