import express ,{Request,Response,NextFunction}from 'express'
const app = express()
import pool from './config/database/database'
import api from './config/versioning/v1'
import { appErrorHandler,genericErrorHandler,notFound } from './middlewares/error.middleware'

import dotenv from 'dotenv'

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger/swaggerOptions';

import cors from 'cors';

app.use(cors({
    origin: '*', 
  }));
  
  


dotenv.config()
app.use(express.json())
const PORT= process.env.PORT || 6000
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database query error:', err.message);
    } else {
      console.log('Database is working! Current time:', res.rows[0].now);
    }
  });
// Swagger setup

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Serve Swagger JSON
app.get('/api-docs.json', (req: Request, res: Response) => {
    res.json(swaggerDocs);
});

app.use('/api/v1',api)

app.use(appErrorHandler)
app.use(genericErrorHandler)
app.use(notFound)
app.listen(PORT,()=>{
    console.log(`Application running on port ${PORT}`)
})
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error?.code ?? 500).json(error);
  });
  

export default app