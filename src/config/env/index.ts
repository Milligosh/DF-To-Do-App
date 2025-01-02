import { configDotenv } from "dotenv";
import development from "./development";

configDotenv()
 export default {
    development:{...development},

 }[process.env.NODE_ENV || 'development']