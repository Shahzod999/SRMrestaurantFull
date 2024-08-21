import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from "../store/store";
// import axios from "axios";
import axiosInstance from '../utils/axiosInstance';
import toast from "react-hot-toast";

// /get-all-foods/:type
export const fetchAllFoods = createAsyncThunk(
  "allFoods/fetchAllFoods",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const type = state.allFoods.type;
    const response = await toast.promise(axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/get-all-foods/${type}`), {
      loading: 'Loading food...',
      success: 'Food loaded successfully!',
      error: 'Failed to load foods.'
    })
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
        state.error = false
      })
      .addCase(fetchAllFoods.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchAllFoods.rejected, (state, action) => {
        state.loading = false
        state.error = true
        console.error("Error fetching foods:", action.error.message);
      })
  }
})


export const selectedAllFoods = (state: RootState) => state.allFoods.products.foods
export const selectedAllFoodsLoading = (state: RootState) => state.allFoods.loading
export const selectedAllFoodsError = (state: RootState) => state.allFoods.error
export const { selectTypeFood } = getAllFoodsSlice.actions
export default getAllFoodsSlice.reducer