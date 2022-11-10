import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { rootReducer } from "../services/reducers";
import { ingredientsReducer } from "./ingredients.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    rootReducer,
    ingredients: ingredientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
