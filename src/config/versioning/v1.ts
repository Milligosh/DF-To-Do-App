import express, { Request, Response, Router } from 'express';

import users from '../../routes/users';
import tasks from '../../routes/tasks'

const api = express.Router();


api.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to My App API',
    });
  });
  
api.use('/users', users);
api.use("/tasks",tasks)

export default api;
