import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const fetchUser = createAsyncThunk(
  'token/fetchUser',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.token.userToken;

    const response = await axios.get(`${BASE_URL}/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

export interface UserLoginState {
  userToken: string | null;
  loading: boolean;
  error: boolean
  info: any
}

const initialState: UserLoginState = {
  userToken: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  loading: false,
  error: false,
  info: ""
}

export const userLoginSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    handleTokenUserLogin: (state, action) => {
      state.userToken = action.payload;
    },
    handleTokenUserLogOut: (state) => {
      state.userToken = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        console.log('loading');
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log(action.error.message);
      });
  },
})


export const selectedUserToken = (state: RootState) => state.token.userToken
export const selectedUserGetUser = (state: RootState) => state.token.info.user

export const { handleTokenUserLogin, handleTokenUserLogOut } = userLoginSlice.actions
export default userLoginSlice.reducer