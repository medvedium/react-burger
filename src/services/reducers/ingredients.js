import {
  ADD_BUN,
  ADD_INGREDIENT,
  CHOOSE_TAB,
  CLOSE_INGREDIENT_MODAL,
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  OPEN_INGREDIENT_MODAL,
  REMOVE_INGREDIENT,
  SELECT_INGREDIENT,
} from "../actions/ingredient";
import { fetchGet } from "../../utils/api";
import { _BUN, _DATA_URL, _MAIN, _SAUCE } from "../../utils/constants";

const initialState = {
  bun: [],
  sauce: [],
  main: [],
  isRequest: false,
  isRequestError: false,
  isIngredientModalOpen: false,
  selectedIngredient: {},
  selectedIngredients: [],
  selectedBun: {},
  activeTab: _BUN,
};

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

export const ingredientsList = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        isRequest: true,
        isRequestError: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        bun: [...action.payload.filter((item) => item.type === _BUN)],
        sauce: [...action.payload.filter((item) => item.type === _SAUCE)],
        main: [...action.payload.filter((item) => item.type === _MAIN)],
        isRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isRequest: false,
        isRequestError: true,
      };
    }
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        isIngredientModalOpen: true,
      };
    }
    case CLOSE_INGREDIENT_MODAL: {
      return {
        ...state,
        isIngredientModalOpen: false,
      };
    }
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.item,
      };
    }
    case CHOOSE_TAB: {
      return {
        ...state,
        activeTab: action.value,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.item],
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        selectedBun: action.item,
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients.filter(
            (item) => item._id !== action.item._id
          ),
        ],
      };
    }
    default:
      return state;
  }
};
