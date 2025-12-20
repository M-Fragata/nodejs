import { Router } from "express";
import { myMiddleware } from "../middlewares/my-midleware.js"
import { ProductsController } from "../controllers/ProductsController.js";

const productsRoutes = Router()

const productsController = new ProductsController()


productsRoutes.get("/:id", productsController.index)

productsRoutes.post("/", myMiddleware, productsController.create )

export { productsRoutes }