import { ActionType } from "@store/types";

export interface OrdersState {
  orders: Order[];
  selectedOrder: Order | undefined | null;
  actionType: ActionType;
}

export interface Order {
  id: number;
  date: string;
  items: OrderType[];
  status: OrderStatus;
}

export type OrderType = "4g" | "5g" | "mobile";

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancel";
