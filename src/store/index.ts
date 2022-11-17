import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todo/todosSlice";

export const store = configureStore({
  reducer: {
    todo: todosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
