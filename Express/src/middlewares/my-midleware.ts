import { Request, Response, NextFunction } from "express"
import { randomUUID } from "node:crypto"


export function myMiddleware(req: Request, res: Response, next: NextFunction){
    const { id } = req.params
    req.user_id = id
    if(!req.user_id){
        req.user_id = randomUUID()
    }

    return next()
}