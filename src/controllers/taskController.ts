import { Request, Response } from "express";
import { TaskSchema } from "../schemas/index.js";
import { Task } from "../types/Task.js";
import { ErrorObj } from "../types/ErrorObj.js";

import { createTask, getTasks, getTaskById, getTasksByCollaborator, updateTask, deleteTaskDB, getCountTasks, getCountDoneTasks } from "../repositories/taskRepository.js";
import { QueryResult } from "pg";

// CREATE
export async function addTask(req: Request, res: Response) {
    const task = req.body as Task;

    const validation = TaskSchema.validate(task);

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        res.status(400).send(errors);
        return;
    }

    try {
        await createTask(validation.value);
        res.sendStatus(201);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

// READ
export async function returnTasks(req: Request, res: Response) {
    try {
        const { rows: tasks } = await getTasks();
        res.status(200).send(tasks);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}


export async function returnTask(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    if (isNaN(id)) return res.send({ message: 'id not valid' });


    try {
        const { rows: task } = await getTaskById(id);
        console.log(task)
        if (task.length !== 0) {
            res.status(200).send(task[0]);
            return;
        }
        res.status(404).send({ message: "Task not found" });
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}


export async function returnCollaboratorTasks(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    if (isNaN(id)) return res.send({ message: 'id not valid' });


    try {
        const { rows: tasks } = await getTasksByCollaborator(id);
        res.status(200).send(tasks);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

// UPDATE

export async function markTaskAsDoneOrUndone(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    if (isNaN(id)) return res.send({ message: 'id not valid' });


    try {
        const resp: (QueryResult<Task> | ErrorObj) = await updateTask(id);
        if ('message' in resp) {
            res.status(resp.code ?? 400).send({ message: resp.message });
            return;
        }
        res.sendStatus(200);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

// DELETE

export async function deleteTask(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    if (isNaN(id)) return res.send({ message: 'id not valid' });


    try {
        const result: QueryResult<Task> = await deleteTaskDB(id);
        if (result?.command === 'DELETE' && result?.rowCount === 1) {
            res.sendStatus(200);
            return;
        }
        res.status(400).send({ message: "Something went wrong! Check if this task exists." });
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}


export async function countTasks(req: Request, res: Response) {

    try {
        const { rows: count } = await getCountTasks();

        res.status(200).send(count[0]);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export async function countDoneTasks(req: Request, res: Response) {

    try {
        const { rows: count } = await getCountDoneTasks();

        res.status(200).send(count[0]);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}