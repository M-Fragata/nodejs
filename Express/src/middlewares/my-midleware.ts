import { Request, Response, NextFunction } from "express"

export function myMiddleware(req: Request, res: Response, next: NextFunction){
    const { id } = req.params
    req.user_id = id
    if(!req.user_id){
        req.user_id = "12345"
    }

    return next()
}