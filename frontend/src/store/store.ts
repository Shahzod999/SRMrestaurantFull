import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "../features/userLoginSlice";
import orderedFoodSlice from "../features/orderedFoodSlice";

export const store = configureStore({
  reducer: {
    token: userLoginSlice,
    orderedFoods: orderedFoodSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch