import express, { Router } from "express";

import { controller as dataController } from "../controllers/data_controller";
import commonErrorHandler from "../middleware/common_error_handler";

const dataRouter: Router = express.Router();

// Rutas para la entidad Data
dataRouter.get("/", dataController.getData)
dataRouter.post("/", dataController.createData);
dataRouter.put("/", dataController.addDataFromRequest);

export default dataRouter;
