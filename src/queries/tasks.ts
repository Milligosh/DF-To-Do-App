export const taskQueries={
 createTask:`INSERT INTO tasks(
 id,
 task,
 userId,
 priority
 )VALUES($1,$2,$3, $4)RETURNING *`,
 checkUserExistence:`SELECT * FROM users where id=$1`,
 fetchAllTasksByUser:`SELECT * FROM tasks where userId=$1`,
 deleteTask:`DELETE FROM tasks where id=$1 and userId=$2`,
 checkTaskExistence:`SELECT * FROM tasks where id=$1 and userId=$2`,
 updateTask: `UPDATE tasks SET task=$1,priority=$2, completed=$3 WHERE id=$4 AND userId=$5 RETURNING *`,
 //fetchTaskbyId: `Select id,task,userId,priority FROM tasks WHERE id=$1`,
 
 
}