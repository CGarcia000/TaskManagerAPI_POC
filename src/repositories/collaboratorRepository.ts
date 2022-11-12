import connection from "../db/psql.js";

import { Collaborator } from "../types/Collaborator";
import { QueryResult } from "pg";

export async function createCollaborator(collaborator: Collaborator) {
    return (
        await connection.query(
            `INSERT INTO collaborators (name, age) VALUES ($1, $2);`,
            [collaborator.name, collaborator.age]
        )
    )
}

export async function getCollaborators(): Promise<QueryResult<Collaborator>> {
    return connection.query(
        `SELECT * FROM collaborators;`
    );
}

export async function getCollaborator(id: number): Promise<QueryResult<Collaborator>> {
    return connection.query(
        `SELECT * FROM collaborators WHERE id = $1 LIMIT 1;`,
        [id]
    )
}