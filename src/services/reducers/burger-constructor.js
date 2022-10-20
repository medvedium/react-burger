import {
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER,
  MAKE_ORDER_FAILED,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
} from "../actions/burger-constructor";
import { fetchPost } from "../../utils/api";
import { _ORDER_URL } from "../../utils/constants";

const initialState = {
  isRequest: false,
  isRequestError: false,
  isOrderModalOpen: false,
  orderName: null,
  orderNumber: null,
};

export function postOrderData(orderData) {
  return function (dispatch) {
    dispatch({ type: MAKE_ORDER });
    fetchPost(_ORDER_URL, orderData)
      .then((data) => {
        dispatch({ type: MAKE_ORDER_SUCCESS, payload: data });
        dispatch({ type: OPEN_ORDER_MODAL });
      })
      .catch((error) => {
        dispatch({ type: MAKE_ORDER_FAILED });
      });
  };
}

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpen: true,
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpen: false,
      };
    }
    case MAKE_ORDER: {
      return {
        ...state,
        isRequest: true,
        isRequestError: false,
      };
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        isRequest: false,
        orderName: action.payload.name,
        orderNumber: action.payload.order.number,
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        isRequest: false,
        isRequestError: true,
      };
    }
    default:
      return state;
  }
};
