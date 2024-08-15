
import cors from 'cors';
import express from 'express';

import dataRouter from './API/routes/data_router';
import pulsiRouter from './API/routes/pulsi_router';
import internalServerErrorHandler from "./API/middleware/internal_server_error_handler";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-KEY, Origin, X-Requested-With, Accept, Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

app.use('/api/data', dataRouter);
app.use('/api/pulsi', pulsiRouter);


app.use(internalServerErrorHandler);
export default app;