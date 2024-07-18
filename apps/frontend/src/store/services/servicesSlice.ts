import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ActionType } from "@store/types";
import { ServicesState, Service } from "./types";

const initialState: ServicesState = {
  services: [
    { id: 1, name: "Hello", status: "World", details: "Details" },
    { id: 2, name: "Hello", status: "World", details: "Details" },
    { id: 3, name: "Hello", status: "World", details: "Details" },
  ],
  selectedService: undefined,
  actionType: undefined,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<Service>) => {
      state.services.push(action.payload);
    },
    editService: (state, action: PayloadAction<Service>) => {
      state.services = state.services.map((service) => {
        if (service.id === action.payload.id) {
          return action.payload;
        }

        return service;
      });
    },
    deleteService: (state, action: PayloadAction<Service>) => {
      state.services = state.services.filter(
        (service) => service.id != action.payload.id
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
    setSelectedService: (
      state,
      action: PayloadAction<Service | undefined | null>
    ) => {
      state.selectedService = action.payload;
    },
  },
});

export const {
  addService,
  editService,
  deleteService,
  setActiontype,
  setSelectedService,
} = servicesSlice.actions;

export default servicesSlice.reducer;
