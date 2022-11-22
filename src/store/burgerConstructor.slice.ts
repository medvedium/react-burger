import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBurgerConstructorState {
  orderName: string;
  orderNumber: number;
  modalIsOpen: boolean;
}

const initialState: IBurgerConstructorState = {
  orderName: "",
  orderNumber: 0,
  modalIsOpen: false,
};

export const burgerConstructorSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getOrderData(state, action: PayloadAction<any>) {
      state.orderName = action.payload.name;
      state.orderNumber = action.payload.order.number;
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
