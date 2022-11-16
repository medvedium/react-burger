import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  name: string;
  email: string;
  password: string;
  token: string;
  isAuth: boolean;
}

const initialState: IAuthState = {
  name: "",
  email: "",
  password: "",
  token: "",
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
