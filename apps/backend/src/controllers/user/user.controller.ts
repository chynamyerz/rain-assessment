import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";
import { CreateUserProps, UpdateUserProps } from "./types";
import {
  TypedRequest,
  TypedRequestBody,
  TypedRequestQuery,
} from "@utils/types";
import asyncErrorHandler from "@utils/async-error-handler";
import { customError } from "@utils/app-error";
import { HTTP_STATUS } from "@utils/http-status";
import prismaClient from "@/prisma-client";
import { User } from "@prisma/client";
import { userAuthToken } from "@/utils/userAuthToken";

const userClient = prismaClient.user;
const acountClient = prismaClient.account;

export const getUser = asyncErrorHandler(
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

    const user = await userClient.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return customError(
        `User with id: ${req.params.id} does not exist!`,
        HTTP_STATUS.NOT_FOUND,
        next
      );
    }

    res
      .status(HTTP_STATUS.OK)
      .json({ data: { user: userWithoutPassword(user) }, success: true });
  }
);

export const getUsers = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const users = await userClient.findMany();

    res.status(HTTP_STATUS.OK).json({
      data: { users: users.map((user) => userWithoutPassword(user)) },
      success: true,
    });
  }
);

export const createUser = asyncErrorHandler(
  async (
    req: TypedRequestBody<CreateUserProps>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.body.email) {
      return customError(
        `Email required, but it is not provided!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    if (!req.body.password) {
      return customError(
        `Password required, but it is not provided!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    if (await userClient.findUnique({ where: { email: req.body.email } })) {
      return customError(
        `User with email: ${req.body.email}, already exist`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    const hashedPassword = await hash(req.body.password, 10);

    const user = await userClient.create({
      data: { ...req.body, password: hashedPassword },
    });

    await acountClient.create({
      data: {
        balance: 0,
        status: "inactive",
        dueDate: "",
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    res
      .status(HTTP_STATUS.OK)
      .json({ data: { user: userWithoutPassword(user) }, success: true });
  }
);

export const updateUser = asyncErrorHandler(
  async (
    req: TypedRequest<{ id: string }, UpdateUserProps>,
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

    if (
      id !== Number(req.params.id) ||
      !(await userClient.findUnique({ where: { id } }))
    ) {
      return customError(
        `User with id: ${req.params.id}, does not exist!`,
        HTTP_STATUS.NOT_FOUND,
        next
      );
    }

    const user = await userClient.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res
      .status(HTTP_STATUS.OK)
      .json({ data: { user: userWithoutPassword(user) }, success: true });
  }
);

export const deleteUser = asyncErrorHandler(
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

    if (
      id !== Number(req.params.id) ||
      !(await userClient.findUnique({ where: { id } }))
    ) {
      return customError(
        `User with id: ${req.params.id}, does not exist!`,
        HTTP_STATUS.NOT_FOUND,
        next
      );
    }

    const user = await userClient.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res
      .status(HTTP_STATUS.OK)
      .json({ data: { user: userWithoutPassword(user) }, success: true });
  }
);

function userWithoutPassword(user: User): Omit<User, "password"> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
