import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import toast from "react-hot-toast";


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
      if (index !== -1 && action.payload.amount > 0) {
        state.orderedFoods[index] = {
          ...state.orderedFoods[index],
          ...action.payload,
        };
      } else if (action.payload.amount > 0) {
        state.orderedFoods.push(action.payload);
      }
      state.orderedFoods.sort((a, b) => a.name.localeCompare(b.name));
      localStorage.setItem("order", JSON.stringify(state.orderedFoods))

      toast('Barakallah!', {
        icon: '👏',
      });
    },
    removeFoodfromOrder: (state, action) => {
      console.log(state.orderedFoods.filter((item) => item._id !== action.payload._id), 'id');
      state.orderedFoods = state.orderedFoods.filter((item) => item._id !== action.payload._id)
      localStorage.setItem("order", JSON.stringify(state.orderedFoods))
      toast.success('Food delete', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    },
    removeOrderFoodList: (state) => {
      state.orderedFoods = [];
      state.choosenTable = null;
      localStorage.removeItem("order");
      localStorage.removeItem("choosenTable")
      toast.success('Food delete', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    },
    tableChoose: (state, action) => {
      state.choosenTable = action.payload
      localStorage.setItem("choosenTable", JSON.stringify(action.payload))
      toast('Table!', {
        icon: '🍴',
      });
    }
  }
})

export const selectedOrderedFoods = (state: RootState) => state.orderedFoods.orderedFoods
export const selectedGuestTable = (state: RootState) => state.orderedFoods.choosenTable

export const { addOrderToFoodState, removeFoodfromOrder, removeOrderFoodList, tableChoose } = orderedFoodSlice.actions
export default orderedFoodSlice.reducer