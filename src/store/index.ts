import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { rootReducer } from "../services/reducers";
import { ingredientsReducer } from "./ingredients.slice";
import { burgerConstructorReducer } from "./burgerConstructor.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    rootReducer,
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
