import { createSlice } from "@reduxjs/toolkit";

interface IBurgerConstructorState {
  // isRequest: boolean,
  // isRequestError: boolean,
  isOrderModalOpen: boolean;
  orderName: string;
  orderNumber: number;
}

const initialState: IBurgerConstructorState = {
  // isRequest: false,
  // isRequestError: false,
  isOrderModalOpen: false,
  orderName: "",
  orderNumber: 0,
};

export const burgerConstructorSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    openOrderModal(state) {
      state.isOrderModalOpen = true;
    },
    closeOrderModal(state) {
      state.isOrderModalOpen = false;
    },
  },
});

export const burgerConstructorActions = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
