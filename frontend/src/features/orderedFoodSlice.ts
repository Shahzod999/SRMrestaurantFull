import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface orderedFoodState {
  orderedFoods: any
}

const initialState: orderedFoodState = {
  orderedFoods: []
}

export const orderedFoodSlice = createSlice({
  name: "orderedFoods",
  initialState,
  reducers: {
    addOrderToFoodState: (state, action) => {
      const index = state.orderedFoods.findIndex((food) => food.id === action.payload.id)
      if (index !== -1) {
        state.orderedFoods[index] = {
          ...state.orderedFoods[index],
          ...action.payload,
        };
      } else {
        state.orderedFoods.push(action.payload);
      }
    }
  }
})

export const selectedOrderedFoods = (state: RootState) => state.orderedFoods.orderedFoods
export const { addOrderToFoodState } = orderedFoodSlice.actions
export default orderedFoodSlice.reducer