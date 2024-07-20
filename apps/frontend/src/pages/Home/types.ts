import { User } from "@store/user/types";

export interface UserInput extends Pick<User, "email"> {
  password: string;
  isNew: boolean;
}
