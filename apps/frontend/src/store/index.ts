import { configureStore } from "@reduxjs/toolkit";

import servicesReducer from "./services/servicesSlice";
import ordersReducer from "./orders/ordersSlice";
import paymentsReducer from "./payments/paymentsSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    orders: ordersReducer,
    payments: paymentsReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
