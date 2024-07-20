import { NextFunction, Response, Request } from "express";
import asyncErrorHandler from "@utils/async-error-handler";
import { customError } from "@utils/app-error";
import { HTTP_STATUS } from "@utils/http-status";
import prismaClient from "@/prisma-client";
import { userAuthToken } from "@/utils/userAuthToken";
import {
  TypedRequest,
  TypedRequestBody,
  TypedRequestQuery,
} from "@/utils/types";
import { CreateServiceProps, UpdateServiceProps } from "./types";

const serviceClient = prismaClient.service;
const accountClient = prismaClient.account;

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

export const createService = asyncErrorHandler(
  async (
    req: TypedRequestBody<CreateServiceProps>,
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

    if (!req.body.details) {
      return customError(
        `Details required, but it is not provided!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    if (!req.body.status) {
      return customError(
        `Status required, but it is not provided!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    const service = await serviceClient.create({
      data: { ...req.body, accountId: account.id },
    });

    res.status(HTTP_STATUS.OK).json({ data: { service }, success: true });
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

    const updateData: UpdateServiceProps = {};

    for (const key of Object.keys(req.body)) {
      type keyType = "name" | "details" | "status";
      if (req.body[key as keyType]) {
        updateData[key as keyType] = req.body[key as keyType];
      }
    }

    const service = await serviceClient.update({
      where: { id: Number(req.params.id) },
      data: updateData,
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

    const updateData: UpdateServiceProps = {};

    for (const key of Object.keys(req.body)) {
      type keyType = "name" | "details" | "status";
      if (req.body[key as keyType]) {
        updateData[key as keyType] = req.body[key as keyType];
      }
    }

    const service = await serviceClient.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(HTTP_STATUS.OK).json({ data: { service }, success: true });
  }
);
