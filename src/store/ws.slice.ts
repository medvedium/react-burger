import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderRequest } from "../models/models";

interface IWsState {
  status: string;
  connectionError: string;
  message: IOrderRequest;
}

const initialState: IWsState = {
  status: "",
  connectionError: "",
  message: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    connecting(state) {
      state.status = "Connecting";
    },
    open(state) {
      state.status = "Online";
    },
    close(state) {
      state.status = "Offline";
    },
    error(state, action: PayloadAction<string>) {
      state.connectionError = action.payload;
    },
    onMessage(state, action: PayloadAction<IOrderRequest>) {
      state.message = action.payload;
    },
  },
});

export const wsActions = wsSlice.actions;
export const wsReducer = wsSlice.reducer;
