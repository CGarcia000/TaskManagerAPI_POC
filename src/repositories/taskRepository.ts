import connection from "../db/psql.js";

import { Task } from "../types/Task.js";
import { Count } from "../types/Count.js";
import { ErrorObj } from "../types/ErrorObj.js";
import { QueryResult } from "pg";

export async function createTask(task: Task) {
    return (
        await connection.query(
            `INSERT INTO tasks (name, description, collaborator_id) VALUES ($1, $2, $3);`,
            [task.name, task.description, task.collaboratorId]
        )
    )
}

export async function getTasks(): Promise<QueryResult<Task>> {
    return connection.query(
        `SELECT * FROM tasks;`
    );
}

export async function getTaskById(id: number): Promise<QueryResult<Task>> {
    return connection.query(
        `SELECT * FROM tasks WHERE id = $1 LIMIT 1;`,
        [id]
    )
}

export async function getTasksByCollaborator(id: number): Promise<QueryResult<Task>> {
    return connection.query(
        `SELECT * FROM tasks WHERE collaborator_id = $1;`,
        [id]
    )
}

export async function updateTask(id: number): Promise<QueryResult<Task> | ErrorObj> {
    const { rows: status } = await connection.query<Task>(
        `SELECT status FROM tasks WHERE id = $1 LIMIT 1;`,
        [id]
    )
    if (status.length === 0) return { message: 'Task id not found', code: 404 };

    const newStatus: string = status[0].status ? "false" : "true";

    return (
        await connection.query(
            `UPDATE tasks SET status = $1 WHERE id = $2;`,
            [newStatus, id]
        )
    );
}

export async function deleteTaskDB(id: number) {
    const { rows: task } = await connection.query<Task>(
        `SELECT * FROM tasks WHERE id = $1 LIMIT 1;`,
        [id]
    )
    if (task.length === 0) return;

    return (
        await connection.query(
            `DELETE FROM tasks WHERE id = $1;`,
            [id]
        )
    );
}

export async function getCountTasks() {
    return connection.query<Count>(`SELECT COUNT(*) FROM tasks;`)
}

export async function getCountDoneTasks() {
    return connection.query<Count>(`SELECT COUNT(*) FROM tasks WHERE status='true';`)
}