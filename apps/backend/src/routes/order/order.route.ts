import { createOrder, getOrders } from "@controllers/order/order.controller";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.post("/", createOrder);

export default orderRouter;
