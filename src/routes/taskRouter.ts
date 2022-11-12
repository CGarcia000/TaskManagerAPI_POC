import express from "express";
import { Router } from 'express';

import * as taskController from '../controllers/taskController.js'

const taskRouter: Router = express.Router();

// Add new tasks
taskRouter.post('/add/task', taskController.addTask);

// Get all tasks or by task id
taskRouter.get('/task', taskController.returnTasks);

taskRouter.get('/task/:id', taskController.returnTask);

// Get all tasks by collaborator
taskRouter.get('/collaborator/:id/tasks', taskController.returnCollaboratorTasks);

// Alter a task status as done or not done yet
taskRouter.patch('/task/:id/mark', taskController.markTaskAsDoneOrUndone);

// Delete a task by id
taskRouter.delete('/task/:id', taskController.deleteTask);

// Count tasks and done tasks
taskRouter.get('/count/task', taskController.countTasks);

taskRouter.get('/count/task/done', taskController.countDoneTasks);



export default taskRouter;