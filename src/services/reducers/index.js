import { combineReducers } from "redux";
import { ingredientsList } from "./ingredients";
import { burgerConstructor } from "./burger-constructor";
import { userData } from "./auth";
import { modalReducer } from "../reducers/modal";

export const rootReducer = combineReducers({
  ingredientsList,
  burgerConstructor,
  userData,
  modalReducer,
});
