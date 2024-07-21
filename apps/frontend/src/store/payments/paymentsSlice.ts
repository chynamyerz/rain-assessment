import { createSlice } from "@reduxjs/toolkit";

import { PaymentsState } from "./types";

const initialState: PaymentsState = {
  actionType: undefined,
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
});

export const {} = paymentsSlice.actions;

export default paymentsSlice.reducer;
