import { User } from "@prisma/client";

export interface SignInProps
  extends Omit<User, "id" | "firstName" | "lastName"> {}
