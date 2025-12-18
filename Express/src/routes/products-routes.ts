import { Router } from "express";
import { myMiddleware } from "../middlewares/my-midleware.js"

const productsRoutes = Router()

productsRoutes.get("/:id", myMiddleware, async (req, res) => {
// /products?page=1&limit=10
    const { page, limit } = req.query

    res.send(`Página ${page} de ${limit} - ID ${req.user_id}`)
})

productsRoutes.post("/", myMiddleware /*Middleware utilizado de forma local*/, async (req, res) => {
    const {name, price} = req.body

    //res.send(`Produto: ${name} custa R$ ${price},00`)
    res.status(201).json({name, price, user_id: req.user_id})
})

export { productsRoutes }