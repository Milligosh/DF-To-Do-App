import { NextFunction,Request,Response } from "express";
import { UserServices } from "../services/users";
import { sendResponse } from "../helpers/response";

export class UserControllers{
    static async createUser(req:Request,res:Response,next:NextFunction):Promise<any>{
    
    try {
        const result= await UserServices.createUser(req.body)
        return sendResponse(res, result.status, result.code, result.message, result.data);
    } catch (error) {
        next (error)
    }
    }

    static async loginUser(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
            const result =await UserServices.login(req.body)
            return sendResponse(res, result.status, result.code, result.message, result.data);
        } catch (error) {
            next(error)
        }
    }
}