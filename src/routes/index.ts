import express from 'express';
import { Router } from 'express';

import collaboratorRouter from './collaboratorRouter.js';
import taskRouter from './taskRouter.js';

const router: Router = express.Router();


router.use(collaboratorRouter);
router.use(taskRouter);


export default router;