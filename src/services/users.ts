import { GenericHelper } from "../helpers/generic.helper"
import pool from "../config/database/database";
import { UserQueries } from "../queries/users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  config from '../config/env/development'
export default interface User{
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    phonenumber: string;
    created_at: string;
}
export class UserServices{
    static async createUser(body:any): Promise<any>{
 const {firstname, lastname, username, email, password, phonenumber}= body
  const id =GenericHelper.generateID()
  

    const usernameExist =(await pool.query(UserQueries.checkUsernameExistence,[username])).rows[0]
    
    if (usernameExist){
        return{
            
                code: 409,
                message: "User Name already exists",
                data: null,
                status: "error",
              
        }
    }
    const emailExist=(await pool.query(UserQueries.checkEmailExistence,[email])).rows[0]
    if (emailExist){
        return{
            
                code: 409,
                message: "email already exists",
                data: null,
                status: "error",
              
        }
    }
    const saltRounds= 12
    const hashPassword = bcrypt.hashSync(password,saltRounds)
    const response= (await pool.query(UserQueries.createUser,[
        id,
        firstname,
        lastname,
        username,
        email,
        hashPassword,
        phonenumber,]))
        
        return{
        code: 201,
      status: "success",
      message: "New user added successfully",
      data: response.rows[0],
    };
    
    
}
static async login(body:any):Promise<any>{
const {email,password}=body

const checkExistence=(await pool.query(UserQueries.checkEmailExistence,[email])).rows[0]

if(!checkExistence){
    return{
        code: 409,
      status: "error",
      message: "User does not exist",
      data: null,
    }
}
const {password: databasePassword,
    firstname,
    lastname,
    username,
    id,
    created_at}= checkExistence

    const comparePassword= bcrypt.compareSync(password,databasePassword)

    if(!comparePassword){
        return{code: 409,
            status: "error",
            message: "Wrong log-In credentials",
            data: null,}
    }
    const options={
        "expiresIn":"1d"
    }
    const token= jwt.sign({
        id,
        email,
        username,
        firstname,
        lastname,
        created_at
},config.JWT_SECRET as string,options)

return{
    status: "success",
      message: "User login successfully",
      code: 200,
      data: {
        id,
        firstname,
        lastname,
        username,
        email,
        token,
        created_at,
      },
    
}
}
}