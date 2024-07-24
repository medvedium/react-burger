import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderResponse } from "../models/models";

interface IBurgerConstructorState {
  orderName: string;
  orderNumber: number;
  modalIsOpen: boolean;
}

export const initialState: IBurgerConstructorState = {
  orderName: "",
  orderNumber: 0,
  modalIsOpen: false,
};

export const burgerConstructorSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getOrderData(state, action: PayloadAction<IOrderResponse>) {
      state.orderName = action.payload.name;
      state.orderNumber = action.payload.order.number;
    },
    resetOrderModal(state) {
      state.orderName = "";
      state.orderNumber = 0;
    },
    openOrderModal(state) {
      state.modalIsOpen = true;
    },
    closeOrderModal(state) {
      state.modalIsOpen = false;
    },
  },
});

export const burgerConstructorActions = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
