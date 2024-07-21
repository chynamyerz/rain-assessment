import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ActionType } from "@store/types";
import { OrdersState, Order } from "./types";

const initialState: OrdersState = {
  selectedOrder: undefined,
  actionType: undefined,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
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

export const { setActiontype, setSelectedOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
