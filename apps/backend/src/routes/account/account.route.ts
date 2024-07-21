import { getAccount } from "@controllers/account/account.controller";
import { Router } from "express";

const accountRouter = Router();

accountRouter.get("/", getAccount);

export default accountRouter;
