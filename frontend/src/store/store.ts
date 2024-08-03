import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "../features/userLoginSlice";
import orderedFoodSlice from "../features/orderedFoodSlice";
import getAllFoodsSlice from "../features/getAllFoodsSlice";

export const store = configureStore({
  reducer: {
    token: userLoginSlice,
    orderedFoods: orderedFoodSlice,
    allFood: getAllFoodsSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch