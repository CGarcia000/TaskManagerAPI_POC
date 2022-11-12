import { Request, Response } from "express";
import { Collaborator } from "../types/Collaborator";
import { CollaboratorSchema } from "../schemas/index.js";

import { createCollaborator, getCollaborators, getCollaborator } from "../repositories/collaboratorRepository.js";

export async function addCollaborator(req: Request, res: Response) {
    const collaborator = req.body as Collaborator;

    const validation = CollaboratorSchema.validate(collaborator);

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        res.status(400).send(errors);
        return;
    }

    try {
        await createCollaborator(validation.value);
        res.sendStatus(201);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export async function returnCollaborators(req: Request, res: Response) {
    try {
        const { rows: collaborators } = await getCollaborators();
        res.status(200).send(collaborators);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}

export async function returnCollaborator(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    if (isNaN(id)) return res.send({ message: 'id not valid' });

    try {
        const { rows: collaborator } = await getCollaborator(id);
        res.status(200).send(collaborator[0]);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        return;
    }
}
