import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from "../store/store";
// import axios from "axios";
import axiosInstance from '../utils/axiosInstance';

export const fetchAllFoods = createAsyncThunk(
  "allFoods/fetchAllFoods",
  async () => {
    const token = localStorage.getItem("token")
    console.log(token, 'asdas');
    const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/get-all-foods`)
    return response.data
  }
)


export interface AllFoodsState {
  products: any;
  loading: boolean;
  error: boolean;
}

const initialState: AllFoodsState = {
  products: [],
  loading: false,
  error: false,
}

export const getAllFoodsSlice = createSlice({
  name: "allFoods",
  initialState,
  reducers: {},
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

export default getAllFoodsSlice.reducer