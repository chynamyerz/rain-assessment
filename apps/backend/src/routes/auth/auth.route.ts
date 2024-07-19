import { signIn, signedIn } from "@controllers/auth/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/", signedIn);
authRouter.post("/", signIn);

export default authRouter;
