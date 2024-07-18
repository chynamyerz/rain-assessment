import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ServicesState, Service } from "./types";

const initialState: ServicesState = {
  services: [
    { id: 1, name: "Hello", status: "World", details: "Details" },
    { id: 2, name: "Hello", status: "World", details: "Details" },
    { id: 3, name: "Hello", status: "World", details: "Details" },
  ],
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
  },
});

export const { addService, editService, deleteService } = servicesSlice.actions;

export default servicesSlice.reducer;
