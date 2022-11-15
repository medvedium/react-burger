import { combineReducers } from "redux";
import { burgerConstructor } from "./burger-constructor";
import { userData } from "./auth";
import { modalReducer } from "./modal";

export const rootReducer = combineReducers({
  burgerConstructor,
  userData,
  modalReducer,
});
