import { _LOGIN_URL, _LOGOUT_URL } from "../../utils/constants";
import {
  deleteCookie,
  getCookie,
  loginPost,
  logoutPost,
  refreshTokenRequest,
  setCookie,
} from "../../utils/api";

export const LOGIN_SUCCESS = "LOGIN";
export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const REFRESH_USER = "REFRESH_USER";

export const login = (postData, history) => {
  return function (dispatch) {
    loginPost(_LOGIN_URL, postData)
      .then((res) => {
        let accessToken;
        if (res.accessToken.indexOf("Bearer") === 0)
          accessToken = res.accessToken.split("Bearer ")[1];
        else accessToken = res.accessToken;
        dispatch({
          type: SET_USER,
          user: { ...res.user, password: postData.password },
          token: accessToken,
        });
        setCookie("refreshToken", res.refreshToken);
      })
      .then(() => history.replace({ pathname: "/login" }))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logout = (token, history) => {
  return function (dispatch) {
    logoutPost(_LOGOUT_URL, token)
      .then(() => {
        const oldTokenCookie = getCookie("refreshToken");
        console.log(oldTokenCookie);
        deleteCookie("refreshToken", oldTokenCookie);
      })
      .then(() => history.replace({ pathname: "/login" }))
      .catch((res) => {
        console.log(res);
      });
  };
};

export const refreshUserData = (token) => {
  const refreshData = {
    token: token,
  };
  return function (dispatch) {
    return refreshTokenRequest(refreshData).then((res) => {
      let accessToken = null;
      deleteCookie("refreshToken", token);
      if (res.accessToken.indexOf("Bearer") === 0) {
        accessToken = res.accessToken.split("Bearer ")[1];
      } else {
        accessToken = res.accessToken;
      }
      dispatch({
        type: REFRESH_USER,
        token: accessToken,
      });
      setCookie("refreshToken", res.refreshToken);
      return accessToken;
    });
  };
};
