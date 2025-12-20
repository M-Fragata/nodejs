import { Request, Response } from "express"
import { products } from "../database/database.js"

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

        throw new Error("Erro ao tentar criar o produto")

        const {name, price} = req.body  

        res.status(201).json({ name, price, user_id: req.user_id })
        products.push({
            user_id: req.user_id,
            name: name,
            price: price
        })
            
    }

}