import {
  getAccount,
  updateAccount,
} from "@controllers/account/account.controller";
import { Router } from "express";

const accountRouter = Router();

accountRouter.get("/", getAccount);
accountRouter.post("/", updateAccount);

export default accountRouter;
