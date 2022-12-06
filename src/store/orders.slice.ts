import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderRequest } from "../models/models";

interface IOrderState extends IOrderRequest {
  status: string;
  connectionError: string;
}

const initialState: IOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  success: false,
  status: "",
  connectionError: "",
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    wsConnecting(state) {
      state.status = "Connecting";
    },
    wsOpen(state) {
      state.status = "Online";
    },
    wsClose(state) {
      state.status = "Offline";
    },
    wsError(state, action: PayloadAction<string>) {
      state.connectionError = action.payload;
    },
    addOrders(state, action: PayloadAction<IOrderRequest>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.success = true;
    },
  },
});

export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
