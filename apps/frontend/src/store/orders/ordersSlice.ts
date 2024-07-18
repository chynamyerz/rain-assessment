import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ActionType } from "@store/types";
import { OrdersState, Order } from "./types";

const initialState: OrdersState = {
  orders: [
    { id: 1, date: "2-24-06-12", items: ["4g"], status: "pending" },
    { id: 2, date: "2-24-06-12", items: ["5g"], status: "shipped" },
    { id: 3, date: "2-24-06-12", items: ["mobile"], status: "delivered" },
  ],
  selectedOrder: undefined,
  actionType: undefined,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    editOrder: (state, action: PayloadAction<Order>) => {
      state.orders = state.orders.map((order) => {
        if (order.id === action.payload.id) {
          return action.payload;
        }

        return order;
      });
    },
    deleteOrder: (state, action: PayloadAction<Order>) => {
      state.orders = state.orders.filter(
        (order) => order.id != action.payload.id
      );
    },
    setActiontype: (state, action: PayloadAction<ActionType>) => {
      switch (action.payload) {
        case "add":
          state.actionType = "add";
          break;
        case "edit":
          state.actionType = "edit";
          break;
        case "delete":
          state.actionType = "delete";
          break;
        default:
          state.actionType = undefined;
          return;
      }
    },
    setSelectedOrder: (
      state,
      action: PayloadAction<Order | undefined | null>
    ) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const {
  addOrder,
  editOrder,
  deleteOrder,
  setActiontype,
  setSelectedOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
