import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";


export interface OrderedFood {
  _id: string;
  amount: number;
  stolik?: string;
  [key: string]: any;
}

export interface OrderedFoodState {
  orderedFoods: OrderedFood[];
}

const initialState: OrderedFoodState = {
  orderedFoods: JSON.parse(localStorage.getItem("order") || "[]")
}


export const orderedFoodSlice = createSlice({
  name: "orderedFoods",
  initialState,
  reducers: {
    addOrderToFoodState: (state, action) => {
      const index = state.orderedFoods.findIndex((food) => food._id === action.payload._id)

      if (index !== -1 && action.payload.amount > 0) {
        state.orderedFoods[index] = {
          ...state.orderedFoods[index],
          ...action.payload,
        };
      } else if (action.payload.amount > 0) {
        state.orderedFoods.push(action.payload);
      }
      localStorage.setItem("order", JSON.stringify(state.orderedFoods))
    },
    removeOrderFoodList: (state) => {
      state.orderedFoods = [];
      localStorage.removeItem("order");
    }
  }
})

export const selectedOrderedFoods = (state: RootState) => state.orderedFoods.orderedFoods
export const { addOrderToFoodState, removeOrderFoodList } = orderedFoodSlice.actions
export default orderedFoodSlice.reducer