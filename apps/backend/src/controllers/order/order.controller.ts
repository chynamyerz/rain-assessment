import { NextFunction, Response, Request } from "express";
import asyncErrorHandler from "@utils/async-error-handler";
import { customError } from "@utils/app-error";
import { HTTP_STATUS } from "@utils/http-status";
import prismaClient from "@/prisma-client";
import { userAuthToken } from "@/utils/userAuthToken";
import { TypedRequestBody, TypedRequestQuery } from "@/utils/types";
import { CreateOrderProps } from "./types";

const orderClient = prismaClient.order;
const orderItemClient = prismaClient.orderItem;
const paymentClient = prismaClient.payment;
const serviceClient = prismaClient.service;
const accountClient = prismaClient.account;

export const getOrders = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let tokenDetails: { id: number } | void;

    try {
      tokenDetails = userAuthToken(req, next);
    } catch (error) {
      return customError(
        `You are not signed in!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    const { id } = tokenDetails!;

    const account = await accountClient.findUnique({ where: { userId: id } });

    if (!account) {
      return customError(
        `Account for user with id: ${id}, does not exist!`,
        HTTP_STATUS.NOT_FOUND,
        next
      );
    }

    const orders = await orderClient.findMany({
      where: {
        acoount: {
          id: account.id,
        },
      },
      include: {
        items: true,
      },
    });

    res.status(HTTP_STATUS.OK).json({ data: { orders }, success: true });
  }
);

export const createOrder = asyncErrorHandler(
  async (
    req: TypedRequestBody<CreateOrderProps>,
    res: Response,
    next: NextFunction
  ) => {
    let tokenDetails: { id: number } | void;

    try {
      tokenDetails = userAuthToken(req, next);
    } catch (error) {
      return customError(
        `You are not signed in!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    const { id } = tokenDetails!;

    const account = await accountClient.findUnique({ where: { userId: id } });

    if (!account) {
      return customError(
        `Account for user with id: ${id}, does not exist!`,
        HTTP_STATUS.NOT_FOUND,
        next
      );
    }

    if (!req.body.items || req.body.items.length < 1) {
      return customError(
        `Items required, but it is not provided!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    const order = await orderClient.create({
      data: {
        date: new Date().toISOString(),
        status: "shipped",
        accountId: account.id,
        items: {
          createMany: {
            data: req.body.items.map((item) => ({ item })),
          },
        },
      },
    });

    let amount = 0;
    for (const item of req.body.items) {
      let details = "";

      if (item === "5G") {
        details = "100+ Mbps Unlimited";
        amount += 100;
      } else if (item === "4G Mobile") {
        details = "2GB";
        amount += 50;
      } else {
        details = "10 Mbps limited";
        amount += 75;
      }

      await serviceClient.create({
        data: {
          name: item,
          details,
          status: "inactive",
          accountId: account.id,
        },
      });
    }

    await paymentClient.create({
      data: {
        date: new Date().toISOString(),
        amount,
        status: "completed",
        accountId: account.id,
      },
    });

    res.status(HTTP_STATUS.OK).json({ data: { order }, success: true });
  }
);

export const deleteOrder = asyncErrorHandler(
  async (
    req: TypedRequestQuery<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    let tokenDetails: { id: number } | void;

    try {
      tokenDetails = userAuthToken(req, next);
    } catch (error) {
      return customError(
        `You are not signed in!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    const { id } = tokenDetails!;

    const account = await accountClient.findUnique({ where: { userId: id } });

    if (!account) {
      return customError(
        `Account for user with id: ${id}, does not exist!`,
        HTTP_STATUS.NOT_FOUND,
        next
      );
    }

    await orderItemClient.deleteMany({
      where: { orderId: Number(req.params.id) },
    });

    const order = await orderClient.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(HTTP_STATUS.OK).json({ data: { order }, success: true });
  }
);
