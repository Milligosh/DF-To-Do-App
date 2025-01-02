import { taskQueries } from "../queries/tasks";
import { GenericHelper } from "../helpers/generic.helper";
import pool from "../config/database/database";


export default interface Task {
    id: string;
    userid: string;
    task: string;
    created_at: string;
    updated_at: string;
    priority: number;
    completed: boolean;
  }
export class TaskServices{
 static async createTask(body:any):Promise<any>{
    const {task,userId,priority}= body
    const id =GenericHelper.generateID()
   try {
    console.log(`Checking existence of userId: ${userId}`);
    const userCheck = await pool.query(taskQueries.checkUserExistence, [userId]);
    if (userCheck.rows.length === 0) {
        return {
            code: 400,
            status: "error",
            message: "userId does not exist",
        };
    }

    const createTask= (await pool.query(taskQueries.createTask,[id,task,userId,priority])).rows[0]
    return{
        code: 201,
                message:"Task created successfully",
                data: createTask,
                status: "success",
    }
   } catch (error:any) {
    console.log('error creating task')
    return{
        code: 500,
        status: "error",
        message: "An error occurred while creating the task",
        error: error.message,
    }
   }
    
 };
 static async fetchTaskByUser(userId:string,filters:any):Promise<any>{
    const checkIfUserExist= await pool.query(taskQueries.checkUserExistence,[userId])
    console.log(checkIfUserExist)
    if(checkIfUserExist.rows.length === 0) {
        return {
            code: 400,
            status: "error",
            message: "userId does not exist",
        };
    }
    let query = taskQueries.fetchAllTasksByUser ;
    const values: any[] = [userId];

    if (filters.priority) {
      query += ` AND priority = $${values.length + 1}`;
      values.push(filters.priority);
    }

    if (filters.completed) {
      query += ` AND completed = $${values.length + 1}`;
      values.push(filters.completed);
    }
    if (filters.search) {
      query += ` AND (task ILIKE $${values.length + 1} OR userId::text ILIKE $${
        values.length + 1
      })`;
      values.push(`%${filters.search}%`);
    }
    
    const data: Task[] = (await pool.query(query, values)).rows;
    if (!data || data.length===0){
      throw{
        status: "error",
        message: "no tasks to fetch",
        code: 404,
        data:null
      }
    }else
    return {
      status: "success",
      message: "Tasks fetched successfully",
      code: 200,
      data,
    }
 }
 static async deleteTask(id:string,userId:string):Promise<any>{
    const checkIfTaskExist= await pool.query(taskQueries.checkTaskExistence,[id,userId])
    //console.log(`id:${id}`, `useriD: ${userId}`)
   
    if (checkIfTaskExist.rows.length===0){
        console.log('res',checkIfTaskExist)
        return{
            status: "Error",
          message: `Task with id ${id} does not exist or does not belong to the user`,
          code: 400,
          data: null,
        }
    }
    const deleteTheTask= (await pool.query(taskQueries.deleteTask,[id,userId])).rows[0]
    return{
        status: "Success",
        message: `Task with id ${id} deleted successfully`,
        code: 204,
        data: checkIfTaskExist,
    }
 }
 static async updateTask(id: string, userId: string, updates: { task?: string; priority?: number; completed?: boolean }): Promise<any> {
    const { task, priority, completed } = updates;

    const checkIfTaskExist = await pool.query(taskQueries.checkTaskExistence, [id, userId]);
    if (checkIfTaskExist.rows.length === 0) {
        return {
            status: "error",
            message: `Task with id ${id} does not exist or does not belong to the user`,
            code: 400,
            data: null,
        };
    }

    // Build the update query
    const updateFields = [];
    const values = [];
    let index = 1;

    if (task !== undefined) {
        updateFields.push(`task = $${index++}`);
        values.push(task);
    }
    if (priority !== undefined) {
        updateFields.push(`priority = $${index++}`);
        values.push(priority);
    }
    if (completed !== undefined) {
        updateFields.push(`completed = $${index++}`);
        values.push(completed);
    }

    // Add the ID and userId to the values
    values.push(id, userId);

    // Execute the update query
    const updateQuery = `UPDATE tasks SET ${updateFields.join(", ")} WHERE id = $${index++} AND userId = $${index}`;
    await pool.query(updateQuery, values);

    return {
        status: "success",
        message: "Task updated successfully",
        code: 200,
        data: { id, task, priority, completed },
    };
}
}