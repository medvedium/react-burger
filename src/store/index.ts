import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { ingredientsReducer } from "./ingredients.slice";
import { burgerConstructorReducer } from "./burgerConstructor.slice";
import { modalReducer } from "./modal.slice";
import { authReducer } from "./auth.slice";
import { ordersActions, ordersReducer } from "./orders.slice";
import socketMiddleware from "./socket-middleware";
import { wsActions } from "./ws.slice";

const wsArg = {
  ...wsActions,
  ...ordersActions,
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    modal: modalReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      api.middleware,
      socketMiddleware(wsArg),
    ]);
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
