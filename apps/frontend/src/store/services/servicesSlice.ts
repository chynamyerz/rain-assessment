import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ActionType } from "@store/types";
import { ServicesState, Service } from "./types";

const initialState: ServicesState = {
  selectedService: undefined,
  actionType: undefined,
};

export const servicesSlice = createSlice({
  name: "services",
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
    setSelectedService: (
      state,
      action: PayloadAction<Service | undefined | null>
    ) => {
      state.selectedService = action.payload;
    },
  },
});

export const { setActiontype, setSelectedService } = servicesSlice.actions;

export default servicesSlice.reducer;
