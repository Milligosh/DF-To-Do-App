import { Request, Response, NextFunction } from "express";
import { TaskServices } from "../services/tasks";

export class TaskControllers {
  static async createTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      //const {id}=(req as any).params.userId
      const result = await TaskServices.createTask({
        ...req.body,
        userId: (req as any)?.user?.id,
      });
      console.log(result);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async fetchAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("1234567");
      const userId = (req as any)?.user?.id;
      const filters = req.query;
      const result = await TaskServices.fetchTaskByUser(userId,filters);
      console.log(result);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
        const id= req.params.id
        const userId= (req as any)?.user?.id;
        console.log(id,userId)
        const result = await TaskServices.deleteTask(id,userId);
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
  }
  static async editDetails(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const id = req.params.id;
        const userId = (req as any)?.user?.id;
        const { task, priority, completed } = req.body; 

        
        const result = await TaskServices.updateTask(id, userId, req.body);
        return res.status(result.code).json(result);
    } catch (error) {
        next(error);
    }
}
}
