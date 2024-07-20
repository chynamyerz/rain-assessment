export interface Account {
  id: number;
  balance: number;
  status: string;
  dueDate: string;
  userId: number;
}

export type ActionType = "add" | "edit" | "delete" | undefined;
