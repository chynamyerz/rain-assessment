import { User } from "@prisma/client";

export interface CreateUserProps extends Omit<User, "id"> {}

export interface UpdateUserProps {
  email?: string;
  password?: string;
}
