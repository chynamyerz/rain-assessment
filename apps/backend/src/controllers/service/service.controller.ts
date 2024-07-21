import { NextFunction, Response, Request } from "express";
import asyncErrorHandler from "@utils/async-error-handler";
import { customError } from "@utils/app-error";
import { HTTP_STATUS } from "@utils/http-status";
import prismaClient from "@/prisma-client";
import { userAuthToken } from "@/utils/userAuthToken";
import { TypedRequest, TypedRequestQuery } from "@/utils/types";
import { UpdateServiceProps } from "./types";

const serviceClient = prismaClient.service;
const accountClient = prismaClient.account;
const paymentClient = prismaClient.payment;

export const getServices = asyncErrorHandler(
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

    const services = await serviceClient.findMany({
      where: {
        acoount: {
          id: account.id,
        },
      },
    });

    res.status(HTTP_STATUS.OK).json({ data: { services }, success: true });
  }
);

export const updateService = asyncErrorHandler(
  async (
    req: TypedRequest<{ id: string }, UpdateServiceProps>,
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

    if (!req.body.name) {
      return customError(
        `Name required, but it is not provided!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    let amount = 0;
    let details = "";

    if (req.body.name === "5G") {
      details = "100+ Mbps Unlimited";
      amount = 100;
    } else if (req.body.name === "4G Mobile") {
      details = "2GB";
      amount = 50;
    } else {
      details = "10 Mbps limited";
      amount = 75;
    }

    const updateData: UpdateServiceProps = { details, name: req.body.name };

    const service = await serviceClient.update({
      where: { id: Number(req.params.id) },
      data: updateData,
    });

    await paymentClient.create({
      data: {
        date: new Date().toISOString(),
        amount,
        status: "completed",
        accountId: account.id,
      },
    });

    res.status(HTTP_STATUS.OK).json({ data: { service }, success: true });
  }
);

export const deleteService = asyncErrorHandler(
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

    const service = await serviceClient.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(HTTP_STATUS.OK).json({ data: { service }, success: true });
  }
);
