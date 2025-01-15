
import jwt, { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import config from "../config/env/development";

dotenv.config();

const checkAuthorizationToken = (authorization: string | undefined): string | null => {
    let bearerToken: string | null = null;
    if (authorization) {
        const token = authorization.split(' ')[1];
        bearerToken = token || authorization;
    }
    return bearerToken;
}

const verifyToken = (token: string, JWT_SECRET: string): any => {
    return verify(token, JWT_SECRET);
}

export default function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers["authorization"];
    const token = checkAuthorizationToken(authHeader);

    if (!token) {
        throw{
          code:404,
          message:'invalid token',
          status:'fail',
          data:null
        }
    }

    try {
      (req as any).user = verifyToken(token, config.JWT_SECRET as string);
      //console.log("User authenticated:", (req as any).user);
        next();
    } catch (err) {
        next (err)
    }
}



