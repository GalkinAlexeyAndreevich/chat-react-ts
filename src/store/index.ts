import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { messageReducer } from "./message";
export { userActions } from "./user";
export { messageActions } from "./message";


export const store = configureStore({
  reducer: {
    user: userReducer,
    message:messageReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
