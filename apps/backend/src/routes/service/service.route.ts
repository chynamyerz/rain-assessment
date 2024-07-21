import {
  deleteService,
  getServices,
  updateService,
} from "@controllers/service/service.controller";
import { Router } from "express";

const serviceRouter = Router();

serviceRouter.get("/", getServices);
serviceRouter.put("/:id", updateService);
serviceRouter.delete("/:id", deleteService);

export default serviceRouter;
