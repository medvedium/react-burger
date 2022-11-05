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
  GET_TOTAL_PRICE,
  UPDATE_SELECTED_INGREDIENTS_LIST,
  RESET_CONSTRUCTOR,
} from "../actions/ingredient";
import { _BUN, _MAIN, _SAUCE } from "../../utils/constants";

const initialState = {
  items: [],
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
  total: null,
};

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
        items: [...action.payload],
        bun: [
          ...action.payload
            .filter((item) => item.type === _BUN)
            .map((item) => {
              return { ...item, count: null };
            }),
        ],
        sauce: [
          ...action.payload
            .filter((item) => item.type === _SAUCE)
            .map((item) => {
              return { ...item, count: null };
            }),
        ],
        main: [
          ...action.payload
            .filter((item) => item.type === _MAIN)
            .map((item) => {
              return { ...item, count: null };
            }),
        ],
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
        selectedIngredients: [
          ...state.selectedIngredients,
          { ...action.item, count: action.item.count++ },
        ],
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        selectedBun: action.item,
        bun: state.bun.map((item) => {
          if (item === action.item) {
            return {
              ...item,
              count: 2,
            };
          } else {
            return {
              ...item,
              count: null,
            };
          }
        }),
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients.filter(
            (item) => item.uid !== action.item.uid
          ),
        ],
        [action.item.type]: [
          ...state[action.item.type].map((item) => {
            if (item._id === action.item._id) {
              return { ...item, count: --item.count };
            } else {
              return item;
            }
          }),
        ],
      };
    }
    case GET_TOTAL_PRICE: {
      return {
        ...state,
        total:
          state.selectedIngredients &&
          state.selectedIngredients.reduce(
            (a, b) => a + b.price,
            state.selectedBun.price * 2 || 0
          ),
      };
    }
    case UPDATE_SELECTED_INGREDIENTS_LIST: {
      return {
        ...state,
        selectedIngredients: [...action.payload],
      };
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        selectedIngredients: [],
        selectedBun: {},
        total: 0,
        bun: [
          ...state.bun.map((item) => {
            return { ...item, count: 0 };
          }),
        ],
        sauce: [
          ...state.sauce.map((item) => {
            return { ...item, count: 0 };
          }),
        ],
        main: [
          ...state.main.map((item) => {
            return { ...item, count: 0 };
          }),
        ],
      };
    }
    default:
      return state;
  }
};
