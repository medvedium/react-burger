import {
  LOGIN_SUCCESS,
  REFRESH_USER,
  SET_TOKEN,
  SET_USER,
} from "../actions/auth";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  password: "",
  token: "",
};

export const userData = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
        password: action.user.password,
        token: action.token,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
      };
    }
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case REFRESH_USER: {
      return {
        ...state,
        token: action.token,
      };
    }
    default:
      return state;
  }
};
