import {
  createOrder,
  deleteOrder,
  getOrders,
} from "@controllers/order/order.controller";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.post("/", createOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
