import express, { Request, Response, Router } from "express";

import { controller as dataController } from "../controllers/data_controller";

const dataRouter: Router = express.Router();

// Rutas para la entidad Data
dataRouter.post("/data", dataController.createData);

export default dataRouter;
