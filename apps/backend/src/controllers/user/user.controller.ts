import { NextFunction, Response } from "express";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateUserProps } from "./types";
import { TypedRequestBody } from "@utils/types";
import asyncErrorHandler from "@utils/async-error-handler";
import { customError } from "@utils/app-error";
import { HTTP_STATUS } from "@utils/http-status";
import prismaClient from "@/prisma-client";
import { User } from "@prisma/client";

const userClient = prismaClient.user;
const acountClient = prismaClient.account;

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
        balance: 120.5,
        status: "active",
        dueDate: "2024-07-15",
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    if (!process.env.JWT_SECRET) {
      return customError(
        `Please report to support team, there was an error.`,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 }
    );

    res.status(HTTP_STATUS.OK).json({
      data: { user: userWithoutPassword(user), token },
      success: true,
    });
  }
);

function userWithoutPassword(user: User): Omit<User, "password"> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
