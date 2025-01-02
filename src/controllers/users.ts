import { NextFunction,Request,Response } from "express";
import { UserServices } from "../services/users";

export class UserControllers{
    static async createUser(req:Request,res:Response,next:NextFunction):Promise<any>{
    
    try {
        const result= await UserServices.createUser(req.body)
        return res.status(result.code).json(result)
    } catch (error) {
        next (error)
    }
    }

    static async loginUser(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
            const result =await UserServices.login(req.body)
            res.status(result.code).json(result)
        } catch (error) {
            next(error)
        }
    }
}