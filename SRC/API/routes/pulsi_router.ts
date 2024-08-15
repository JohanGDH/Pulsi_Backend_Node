import express, { Router } from "express";

import { controller as pulsiController } from "../controllers/pulsi_controller";
import commonErrorHandler from "../middleware/common_error_handler";

const pulsiRouter: Router = express.Router();

pulsiRouter.get("/", pulsiController.listPulsis, commonErrorHandler);
pulsiRouter.get("/:pulsi_ID", pulsiController.getPulsiByID, commonErrorHandler);
pulsiRouter.post("/", pulsiController.savePulsi, commonErrorHandler);
pulsiRouter.put("/:pulsi_ID", pulsiController.updatePulsi, commonErrorHandler);
pulsiRouter.delete("/:pulsi_ID", pulsiController.deletePulsi, commonErrorHandler);

export default pulsiRouter;
