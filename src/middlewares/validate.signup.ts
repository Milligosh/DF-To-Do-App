import { Request, Response, NextFunction } from "express";
import { signUpSchema } from "../middlewares/validation"; 
import { sendResponse } from "../helpers/response"; 
import { ZodError } from "zod";

export const validateSignUpApplicantInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    
    signUpSchema.parse(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map(e => e.message);
       sendResponse(res, "error", 400, errorMessages.join(", "));
    }
    return next(error);
  }
};
