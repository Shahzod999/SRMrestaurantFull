import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";


export interface OrderedFood {
  _id: string;
  amount: number;
  [key: string]: any;
}
export interface TablePlace {
  place: string;
  table: number;
}
export interface OrderedFoodState {
  orderedFoods: OrderedFood[];
  choosenTable: TablePlace | null;
}

const initialState: OrderedFoodState = {
  orderedFoods: JSON.parse(localStorage.getItem("order") || "[]"),
  choosenTable: JSON.parse(localStorage.getItem("choosenTable") || "null"),
}


export const orderedFoodSlice = createSlice({
  name: "orderedFoods",
  initialState,
  reducers: {
    addOrderToFoodState: (state, action) => {
      const index = state.orderedFoods.findIndex((food) => food._id === action.payload._id)

      if (index >= 0 && action.payload.amount > 0) {
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
      state.choosenTable = null;
      localStorage.removeItem("order");
      localStorage.removeItem("choosenTable")

    },
    tableChoose: (state, action) => {
      console.log(action.payload, '1234');

      state.choosenTable = action.payload
      localStorage.setItem("choosenTable", JSON.stringify(action.payload))
    }
  }
})

export const selectedOrderedFoods = (state: RootState) => state.orderedFoods.orderedFoods
export const selectedGuestTable = (state: RootState) => state.orderedFoods.choosenTable

export const { addOrderToFoodState, removeOrderFoodList, tableChoose } = orderedFoodSlice.actions
export default orderedFoodSlice.reducer