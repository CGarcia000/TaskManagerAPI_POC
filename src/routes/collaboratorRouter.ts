import express from "express";
import { Router } from 'express';

import * as collaboratorController from '../controllers/collaboratorController.js'

const collaboratorRouter: Router = express.Router();

// Add a new collaborator
collaboratorRouter.post('/add/collaborator', collaboratorController.addCollaborator);

// Get all collaborators or by id
collaboratorRouter.get('/collaborator', collaboratorController.returnCollaborators);

collaboratorRouter.get('/collaborator/:id', collaboratorController.returnCollaborator);

export default collaboratorRouter;