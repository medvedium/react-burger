import { _BUN, _MAIN, _SAUCE } from "../utils/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../models/models";

interface IngredientsState {
  items: object[];
  bun: object[];
  sauce: object[];
  main: object[];
  isRequest: boolean;
  isRequestError: boolean;
  isIngredientModalOpen: boolean;
  selectedIngredient: object;
  selectedIngredients: IIngredient[];
  selectedBun: object;
  activeTab: string;
  total: number;
}

const initialState: IngredientsState = {
  items: [],
  bun: [],
  sauce: [],
  main: [],
  isRequest: false,
  isRequestError: false,
  isIngredientModalOpen: false,
  selectedIngredient: {},
  selectedIngredients: [],
  selectedBun: {},
  activeTab: _BUN,
  total: 0,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredients(state, action: PayloadAction<object[]>) {
      state.items = [...action.payload];
      state.bun = [
        ...state.items
          // @ts-ignore
          .filter((item: IIngredient) => {
            const type = item.type;
            return type === _BUN;
          })
          .map((item: object) => {
            return { ...item, count: null };
          }),
      ];
      state.sauce = [
        ...state.items
          // @ts-ignore
          .filter((item: IIngredient) => {
            const type = item.type;
            return type === _SAUCE;
          })
          .map((item: object) => {
            return { ...item, count: null };
          }),
      ];
      state.main = [
        ...state.items
          // @ts-ignore
          .filter((item: IIngredient) => {
            const type = item.type;
            return type === _MAIN;
          })
          .map((item: object) => {
            return { ...item, count: null };
          }),
      ];
    },
    chooseTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
    addIngredient(state, action: PayloadAction<IIngredient>) {
      state.selectedIngredients = [
        ...state.selectedIngredients,
        {
          ...action.payload,
          count: action.payload.count++,
        },
      ];
    },
  },
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
