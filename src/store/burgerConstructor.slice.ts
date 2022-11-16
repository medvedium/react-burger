import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IBurgerConstructorState {
  orderName: string;
  orderNumber: number;
}

const initialState: IBurgerConstructorState = {
  orderName: "",
  orderNumber: 0,
};

export const burgerConstructorSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getOrderData(state, action: PayloadAction<any>) {
      state.orderName = action.payload.name;
      state.orderNumber = action.payload.order.number;
    }
  },
});

export const burgerConstructorActions = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
