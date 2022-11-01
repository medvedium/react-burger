import { combineReducers } from "redux";
import { ingredientsList } from "./ingredients";
import { burgerConstructor } from "./burger-constructor";
import { userData } from "./auth";

export const rootReducer = combineReducers({
  ingredientsList,
  burgerConstructor,
  userData,
});
