import { combineReducers } from "redux";
import { ingredientsList } from "./ingredients";
import { burgerConstructor } from "./burger-constructor";

export const rootReducer = combineReducers({
  ingredientsList,
  burgerConstructor,
});
