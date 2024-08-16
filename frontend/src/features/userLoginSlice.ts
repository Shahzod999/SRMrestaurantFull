import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';


export interface UserInfo {
  user: User
  message: string
}

export interface User {
  fullName: string
  email: string
  _id: string
  createdOn: string
  userBoss: boolean
}


export const fetchUser = createAsyncThunk(
  'token/fetchUser',
  async () => {
    const response = await toast.promise(axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/get-user`), {
      loading: 'Loading user data...',
      success: 'User data loaded successfully!',
      error: 'Failed to load user data.'
    }
    );
    return response.data;
  }
);

export interface UserLoginState {
  userToken: string | null;
  loading: boolean;
  error: boolean
  info: UserInfo | null
}

const initialState: UserLoginState = {
  userToken: localStorage.getItem("token") || null,
  loading: false,
  error: false,
  info: null
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
      state.info = null
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
export const selectedUserGetUser = (state: RootState) => state.token.info?.user
export const selectedLoadingToken = (state: RootState) => state.token.loading




export const { handleTokenUserLogin, handleTokenUserLogOut } = userLoginSlice.actions
export default userLoginSlice.reducer