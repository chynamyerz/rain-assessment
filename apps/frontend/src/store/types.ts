export interface User {
  id: number;
  email: string;
}

export interface Account {
  id: number;
  balance: number;
  status: string;
  dueDate: string;
  userId: number;
}

export interface AuthUser extends Pick<User, "email"> {
  password: string;
  isNew: boolean;
}

export type ActionType = "add" | "edit" | "delete" | undefined;
