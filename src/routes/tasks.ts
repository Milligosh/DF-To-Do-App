import express from 'express';
import { TaskControllers } from '../controllers/tasks';
import authenticateToken from '../middlewares/auth.middleware'; // Import your token verification middleware

const router = express.Router();

/**
 * @swagger
 * /tasks/newTask:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *               priority:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: userId does not exist
 *       500:
 *         description: server error
 */
router.post("/newTask", authenticateToken, TaskControllers.createTask);

/**
 * @swagger
 * /tasks/allTasks:
 *   get:
 *     summary: Fetch all tasks for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Successfully fetched all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Tasks fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "task-id-123"
 *                       task:
 *                         type: string
 *                         example: "Sample task"
 *                       userId:
 *                         type: string
 *                         example: "user-id-456"
 *                       priority:
 *                         type: integer
 *                         example: 1
 *                       completed:
 *                         type: boolean
 *                         example: false
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */
router.get("/allTasks",authenticateToken,TaskControllers.fetchAll)

/**
 * @swagger
 * /tasks/deleteTask/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       400:
 *         description: Task does not exist or does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Task with id {id} does not exist or does not belong to the user
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An error occurred while deleting the task
 */
router.delete("/deleteTask/:id",authenticateToken,TaskControllers.deleteTask)

/**
 * @swagger
 * /tasks/update/{id}:
 *   put:
 *     summary: Update task details by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 description: Updated task description
 *               priority:
 *                 type: integer
 *                 description: Updated task priority
 *               completed:
 *                 type: boolean
 *                 description: Updated completion status of the task
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "task-id-123"
 *                     task:
 *                       type: string
 *                       example: "Updated task description"
 *                     priority:
 *                       type: integer
 *                       example: 2
 *                     completed:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid task ID or user does not have permission to update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Task with id {id} does not exist or does not belong to the user
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An error occurred while updating the task
 */
router.put("/update/:id", authenticateToken, TaskControllers.editDetails);
export default router;