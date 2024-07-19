import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { Query } from "express-serve-static-core";
import { customError } from "./app-error";
import { HTTP_STATUS } from "./http-status";
import { TypedRequest, TypedRequestBody, TypedRequestQuery } from "./types";

export const userAuthToken = <T extends Query, K>(
  request: TypedRequest<T, K> | TypedRequestQuery<T> | TypedRequestBody<K>,
  next: NextFunction
) => {
  if (!request.headers.authorization) {
    throw new Error("No authorization.");
  }

  if (!process.env.JWT_SECRET) {
    return customError(
      `Please report to support team, there was an error.`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      next
    );
  }

  const token = request.headers.authorization.split(" ")[1];
  let signedIn: string | jwt.JwtPayload;

  try {
    signedIn = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw error;
  }

  const { id } = signedIn as { id: number };

  return {
    id,
  };
};
