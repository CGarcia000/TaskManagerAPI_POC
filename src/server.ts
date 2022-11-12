import express from 'express';
import { Request, Response } from 'express';

import router from './routes/index.js';

const app = express();

app.use(express.json());

app.use(router);


app.get('/status', (req: Request, res: Response) => res.send('Online'));

app.listen(5000, () => {
    console.log('Aplicação rodando na porta 5000!');
})