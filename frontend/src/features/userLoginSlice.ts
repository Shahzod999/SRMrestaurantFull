import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export interface userInfo {
  error: boolean
  message: string
  email: string
  accessToken: string
  createdOn: string
  fullname: string
  _id: string
}


export interface UserLoginState {
  userInfo: userInfo | null;
}

const initialState: UserLoginState = {
  userInfo: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null,
}

export const userLoginSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    handleTokenUserLogin: (state, action) => {
      state.userInfo = action.payload;
      console.log(action.payload, '444');
    },
    handleTokenUserLogOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem("token");
    }
  }
})


export const selectedUserInfo = (state: RootState) => state.token.userInfo

export const { handleTokenUserLogin, handleTokenUserLogOut } = userLoginSlice.actions
export default userLoginSlice.reducer