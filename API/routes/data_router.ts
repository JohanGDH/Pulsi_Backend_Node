import express, { Request, Response, Router } from "express";

import { controller as DataController } from "../controllers/data_controller";

const router: Router = express.Router();

// Rutas para la entidad Data
router.post("/data",DataController.createData);

export default router;
