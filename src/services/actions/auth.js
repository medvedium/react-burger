import { _LOGIN_URL } from "../../utils/constants";
import {
  deleteCookie,
  getCookie,
  loginPost,
  refreshTokenRequest,
  setCookie,
} from "../../utils/api";

export const LOGIN_SUCCESS = "LOGIN";
export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const REFRESH_USER = "REFRESH_USER";

export const login = (postData) => {
  let accessToken;
  return function (dispatch) {
    loginPost(_LOGIN_URL, postData)
      .then((res) => {
        console.log(res);
        if (res.accessToken.indexOf("Bearer") === 0)
          accessToken = res.accessToken.split("Bearer ")[1];
        else accessToken = res.accessToken;
        dispatch({
          type: SET_USER,
          user: { ...res.user, password: postData.password },
          token: accessToken,
        });
        setCookie("date", new Date());
        setCookie("refreshToken", res.refreshToken);
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const refreshUserData = (token) => {
  const refreshData = {
    token: token,
  };
  let accessToken = null;
  return function (dispatch) {
    return refreshTokenRequest(refreshData).then((res) => {
      const oldDate = getCookie("date");
      deleteCookie("refreshToken", token);
      deleteCookie("date", oldDate);
      if (res.accessToken.indexOf("Bearer") === 0)
        accessToken = res.accessToken.split("Bearer ")[1];
      else accessToken = res.accessToken;
      dispatch({
        type: REFRESH_USER,
        token: accessToken,
      });
      setCookie("refreshToken", res.refreshToken);
      setCookie("date", new Date());
      return accessToken;
    });
  };
};
