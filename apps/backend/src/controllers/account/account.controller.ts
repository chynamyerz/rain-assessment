import { NextFunction, Response } from "express";
import { TypedRequest } from "@utils/types";
import asyncErrorHandler from "@utils/async-error-handler";
import { customError } from "@utils/app-error";
import { HTTP_STATUS } from "@utils/http-status";
import prismaClient from "@/prisma-client";
import { userAuthToken } from "@/utils/userAuthToken";

const acountClient = prismaClient.account;

export const getAccount = asyncErrorHandler(
  async (
    req: TypedRequest<{ id: string }, undefined>,
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

    const account = await acountClient.findUnique({ where: { userId: id } });

    if (!account) {
      return customError(
        `Account for user with id: ${id}, does not exist!`,
        HTTP_STATUS.NOT_FOUND,
        next
      );
    }

    res.status(HTTP_STATUS.OK).json({ data: { account }, success: true });
  }
);
