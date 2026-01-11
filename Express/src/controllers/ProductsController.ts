import { Request, Response } from "express"
import { products } from "../database/database.js"
import { AppError } from "../utils/AppError.js"
import { z } from "zod"
export class ProductsController {
    /**
     * Index - GET para listar varios registros.
     * show - GET para exibir um registro específico
     * create - POST para criar um registro.
     * update - PUT para atualizar um registro.
     * remove - DELETE para remover um registro
     */

    index(req: Request, res: Response) {

        // /products?page=1&limit=10
        //const { page, limit } = req.query
        //res.send(`Página ${page} de ${limit} - ID ${req.user_id}`) 
        res.send(products)
    }

    create(req: Request, res: Response) {


        const bodySchema = z.object({
            name: z.string().trim(),
            price: z.number()
        })

        const { name, price } = bodySchema.parse(req.body)

        res.status(201).json({ name, price, user_id: req.user_id })

        products.push({
            user_id: req.user_id,
            name: name,
            price: price
        })

        throw new AppError("Erro ao tentar criar o produto")

    }

}