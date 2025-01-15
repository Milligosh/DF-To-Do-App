import { GenericHelper } from "../helpers/generic.helper"
import pool from "../config/database/database";
import { UserQueries } from "../queries/users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  config from '../config/env/development'
import { createResponseObject } from "../helpers/response";
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
        return createResponseObject('error', 409, `Username already exists`,null);
    }
    const emailExist=(await pool.query(UserQueries.checkEmailExistence,[email])).rows[0]
    if (emailExist){
        return createResponseObject('error', 409, `email already exists`,null);
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
        
        return createResponseObject('success', 201, `Account created successfully`,response.rows[0]);  
}
static async login(body:any):Promise<any>{
const {email,password}=body

const checkExistence=(await pool.query(UserQueries.checkEmailExistence,[email])).rows[0]

if(!checkExistence){
    return createResponseObject('error', 409, `user does not exist`,null);  
}
const {password: databasePassword,
    firstname,
    lastname,
    username,
    id,
    created_at}= checkExistence

    const comparePassword= bcrypt.compareSync(password,databasePassword)

    if(!comparePassword){
        return createResponseObject('error', 409, `Wrong logIn credentials`,null);  
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
return createResponseObject('success', 200, `User loggedIn successfully`,{
    id,
    firstname,
    lastname,
    username,
    email,
    token,
    created_at,
  },);  
}
}