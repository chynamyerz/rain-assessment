import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ActionType } from "@store/types";
import { PaymentsState, Payment } from "./types";

const initialState: PaymentsState = {
  payments: [
    { id: 1, date: "2-24-06-12", amount: 50, status: "pending" },
    { id: 2, date: "2-24-06-12", amount: 75, status: "completed" },
    { id: 3, date: "2-24-06-12", amount: 100, status: "cancelled" },
  ],
  actionType: undefined,
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.payments.push(action.payload);
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
  },
});

export const { addPayment, setActiontype } = paymentsSlice.actions;

export default paymentsSlice.reducer;
