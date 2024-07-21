import { getPayments } from "@controllers/payment/payment.controller";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter.get("/", getPayments);

export default paymentRouter;
