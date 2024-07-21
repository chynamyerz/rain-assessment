import { ActionType } from "@store/types";

export interface OrdersState {
  selectedOrder: Order | undefined | null;
  actionType: ActionType;
}

export interface Order {
  id: number;
  date: string;
  items: OrderItem[];
  status: OrderStatus;
}

export interface OrderItem {
  id: number;
  item: OrderType;
}

export type OrderType = "4g" | "5g" | "mobile";

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancel";
