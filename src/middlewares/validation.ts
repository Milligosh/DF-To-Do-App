import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { sendResponse } from "../helpers/response";


// Define the Zod schema for the signup request body
const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phonenumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

export { signUpSchema };


export const validateSignUpApplicantInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    signUpSchema.parse(req.body);
    next(); 
  } catch (error) {
    if (error instanceof z.ZodError) {
      
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return sendResponse(res, "error", 400, errorMessage);
    }
    next(error); 
  }
};
