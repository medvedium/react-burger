import {
  GET_ORDER_DATA,
  MAKE_ORDER,
  MAKE_ORDER_FAILED,
  OPEN_ORDER_MODAL,
} from "../actions/burger-constructor";
import { fetchPost } from "../../utils/api";
import { _ORDER_URL } from "../../utils/constants";

const initialState = {
  isRequest: false,
  isRequestError: false,
  isOrderModalOpen: false,
  total: null,
  orderName: null,
  orderNumber: null,
};

// const handleOrderClick = () => {
//   fetchPost(_ORDER_URL, { main: data })
//     .then((data) => {
//       setOrderData({
//         number: data.order.number,
//         name: data.name,
//       });
//       setModalActive(true);
//     })
//     .catch((err) => console.log(err));
// };

export function postOrderData(data) {
  return function (dispatch) {
    dispatch({ type: MAKE_ORDER });
    fetchPost(_ORDER_URL, data)
      .then((data) => {
        dispatch({ type: GET_ORDER_DATA, payload: data });
        dispatch({ type: OPEN_ORDER_MODAL });
      })
      .catch(() => dispatch({ type: MAKE_ORDER_FAILED }));
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
    case MAKE_ORDER: {
      return {
        ...state,
        isRequest: true,
        isRequestError: false,
      };
    }
    case GET_ORDER_DATA: {
      return {
        ...state,
        isRequest: false,
        orderName: action.payload.data.name,
        orderNumber: action.payload.data.number,
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
