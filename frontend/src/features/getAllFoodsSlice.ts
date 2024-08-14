import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from "../store/store";
// import axios from "axios";
import axiosInstance from '../utils/axiosInstance';

// /get-all-foods/:type
export const fetchAllFoods = createAsyncThunk(
  "allFoods/fetchAllFoods",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const type = state.allFood.type;
    console.log(type, "2");

    const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/get-all-foods/${type}`)
    return response.data
  }
)


export interface AllFoodsState {
  products: any;
  loading: boolean;
  error: boolean;
  type: string
}

const initialState: AllFoodsState = {
  products: [],
  loading: false,
  error: false,
  type: ""
}

export const getAllFoodsSlice = createSlice({
  name: "allFoods",
  initialState,
  reducers: {
    selectTypeFood: (state, action) => {
      state.type = action.payload
    }
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(fetchAllFoods.pending, (state) => {
        state.loading = true

      })
      .addCase(fetchAllFoods.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchAllFoods.rejected, (state, action) => {
        state.loading = false
        state.error = true
        console.log(action.error.message)
      })
  }
})


export const selectedAllFoods = (state: RootState) => state.allFood.products.foods
export const selectedAllFoodsLoading = (state: RootState) => state.allFood.loading
export const selectedAllFoodsError = (state: RootState) => state.allFood.error
export const { selectTypeFood } = getAllFoodsSlice.actions
export default getAllFoodsSlice.reducer