import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { ingredientsReducer } from "./ingredients.slice";
import { burgerConstructorReducer } from "./burgerConstructor.slice";
import { modalReducer } from "./modal.slice";
import { authReducer } from "./auth.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    modal: modalReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
