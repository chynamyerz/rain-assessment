import { NextFunction, Request, Response } from "express";
import { compare } from "bcrypt";
import { SignInProps } from "./types";
import { TypedRequestBody } from "@utils/types";
import asyncErrorHandler from "@utils/async-error-handler";
import { customError } from "@utils/app-error";
import { HTTP_STATUS } from "@utils/http-status";
import prismaClient from "@/prisma-client";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { userAuthToken } from "@/utils/userAuthToken";

const userClient = prismaClient.user;

export const signIn = asyncErrorHandler(
  async (
    req: TypedRequestBody<SignInProps>,
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

    const user = await userClient.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return customError(
        `User with email address ${req.body.email} does not exist.`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

    if (!(await compare(req.body.password, user.password))) {
      return customError(
        `Invalid password. Please provide correct password!`,
        HTTP_STATUS.BAD_REQUEST,
        next
      );
    }

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

export const signedIn = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let tokenDetails: { id: number } | void;

    try {
      tokenDetails = userAuthToken(req, next);
    } catch (error) {
      res.status(HTTP_STATUS.OK).json({ data: { user: null }, success: true });
      return;
    }

    const { id } = tokenDetails!;

    const user = await userClient.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      res
        .status(HTTP_STATUS.OK)
        .json({ data: { user: undefined }, success: true });
      return;
    }

    res
      .status(HTTP_STATUS.OK)
      .json({ data: { user: userWithoutPassword(user) }, success: true });
  }
);

function userWithoutPassword(user: User): Omit<User, "password"> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
