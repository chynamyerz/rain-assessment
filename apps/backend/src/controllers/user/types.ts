import { User } from "@prisma/client";

export interface CreateUserProps extends Omit<User, "id"> {}
