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
  isRequest: true,
  isRequestError: false,
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
    getIngredients(state, action: PayloadAction<IIngredient[]>) {
      state.items = action.payload;
      state.bun = action.payload
        .filter((item) => {
          const type = item.type;
          return type === _BUN;
        })
        .map((item: object) => {
          return { ...item, count: 0, uid: "" };
        });
      state.sauce = action.payload
        .filter((item) => {
          const type = item.type;
          return type === _SAUCE;
        })
        .map((item: object) => {
          return { ...item, count: 0, uid: "" };
        });
      state.main = action.payload
        .filter((item) => {
          const type = item.type;
          return type === _MAIN;
        })
        .map((item: object) => {
          return { ...item, count: 0, uid: "" };
        });
      state.isRequest = false;
    },
    getIngredientsFailed(state) {
      state.isRequest = false;
      state.isRequestError = true;
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
      // @ts-ignore
      state[action.payload.type] = state[action.payload.type].map(
        (item: IIngredient) => {
          if (item._id === action.payload._id) {
            return { ...item, count: item.count + 1 };
          } else {
            return item;
          }
        }
      );
    },
    addBun(state, action: PayloadAction<IIngredient>) {
      state.selectedBun = action.payload;
      // @ts-ignore
      state.bun = state.bun.map((item: IIngredient) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            count: 2,
          };
        } else {
          return {
            ...item,
            count: 0,
          };
        }
      });
    },
    removeIngredient(state, action: PayloadAction<IIngredient>) {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item: IIngredient) => item.uid !== action.payload.uid
      );
      // @ts-ignore
      state[action.payload.type] = state[action.payload.type].map(
        (item: IIngredient) => {
          if (item._id === action.payload._id) {
            return { ...item, count: --item.count };
          } else {
            return item;
          }
        }
      );
    },
    getTotalPrice(state) {
      state.total =
        state.selectedIngredients &&
        state.selectedIngredients.reduce(
          (a, b) => a + b.price,
          // @ts-ignore
          state.selectedBun.price * 2 || 0
        );
    },
    updateSelectedIngredients(state, action: PayloadAction<IIngredient[]>) {
      state.selectedIngredients = action.payload;
    },
    resetConstructor(state) {
      state.selectedIngredients = [];
      state.selectedBun = {};
      state.total = 0;
      state.bun = state.bun.map((item) => ({ ...item, count: 0 }));
      state.sauce = state.sauce.map((item) => ({ ...item, count: 0 }));
      state.main = state.main.map((item) => ({ ...item, count: 0 }));
    },
  },
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;