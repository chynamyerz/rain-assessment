import { createUser } from "@controllers/user/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/", createUser);

export default userRouter;
