import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrderRequest } from "../models/models";

interface IOrderState extends IOrderRequest {
  personalOrders: IOrder[];
}

const initialState: IOrderState = {
  orders: [],
  personalOrders: [],
  total: 0,
  totalToday: 0,
  success: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders(state, action: PayloadAction<IOrderRequest>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.success = true;
    },
    addPersonalOrders(state, action: PayloadAction<IOrderRequest>) {
      state.personalOrders = action.payload.orders;
    },
  },
});

export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
