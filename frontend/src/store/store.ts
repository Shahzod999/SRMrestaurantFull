import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "../features/userLoginSlice";

export const store = configureStore({
  reducer: {
    token: userLoginSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch