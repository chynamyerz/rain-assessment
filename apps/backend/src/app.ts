import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from "@routers/user/user.route";
import accountRouter from "@routers/account/account.route";
import authRouter from "@routers/auth/auth.route";
import serviceRouter from "@routers/service/service.route";
import orderRouter from "@routers/order/order.route";
import paymentRouter from "./routes/payment/payment.route";
import AppError from "@utils/app-error";
import { HTTP_STATUS } from "@utils/http-status";
import { errorHandler } from "@utils/error-handler";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/services", serviceRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Cannot find ${req.originalUrl} on the server!`,
      HTTP_STATUS.NOT_FOUND
    )
  );
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export default app;
