import { ActionType } from "@store/types";

export interface PaymentsState {
  payments: Payment[];
  actionType: ActionType;
}

export interface Payment {
  id: number;
  date: string;
  amount: number;
  status: PaymentStatus;
}

export type PaymentStatus = "pending" | "completed" | "cancelled";
