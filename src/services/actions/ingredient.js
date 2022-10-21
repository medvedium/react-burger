import { fetchGet } from "../../utils/api";
import { _BUN, _DATA_URL } from "../../utils/constants";
import { nanoid } from "nanoid";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL";
export const CLOSE_INGREDIENT_MODAL = "CLOSE_INGREDIENT_MODAL";
export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const CHOOSE_TAB = "CHOOSE_TAB";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const GET_TOTAL_PRICE = "GET_TOTAL_PRICE";
export const UPDATE_SELECTED_INGREDIENTS_LIST =
  "UPDATE_SELECTED_INGREDIENTS_LIST";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS });
    fetchGet(_DATA_URL)
      .then(({ data }) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: data,
        });
      })
      .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
  };
}

export const addIngredient = (dispatch, item) => {
  if (item.type === _BUN) {
    dispatch({ type: ADD_BUN, item: item });
    dispatch({ type: GET_TOTAL_PRICE });
  } else {
    item.uid = nanoid(8);
    dispatch({ type: ADD_INGREDIENT, item: item });
    dispatch({ type: GET_TOTAL_PRICE });
  }
};
