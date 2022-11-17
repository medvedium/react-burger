import React, { useEffect } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { useAppSelector } from "../../hooks/redux";
import { useLazyGetUserQuery, useRefreshTokenMutation } from "../../store/api";
import { useActions } from "../../hooks/actions";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const history = useHistory();
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { loginSuccess, refreshUser, logout } = useActions();
  const token = document.cookie ? getCookie("token") : "";
  const refreshToken = document.cookie ? getCookie("refreshToken") : "";
  const [
    getUser,
    {
      isSuccess: isGetUserSuccess,
      isLoading: isGetUserLoading,
      isError: isGetUserError,
      data: userData,
    },
  ] = useLazyGetUserQuery();
  const [
    refreshTokenPost,
    { isSuccess: isRefreshSuccess, isError: isRefreshError },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    if (!isGetUserError && !isGetUserSuccess) {
      getUser(token);
      if (isGetUserSuccess) {
        loginSuccess();
        refreshUser(userData);
      }
      if (isGetUserError && refreshToken !== undefined && refreshToken !== "") {
        refreshTokenPost(refreshToken);
        if (isRefreshSuccess) {
          console.log(isRefreshSuccess);
          let accessToken;
          deleteCookie("refreshToken", token);
          if (userData.accessToken.indexOf("Bearer") === 0) {
            accessToken = userData.accessToken.split("Bearer ")[1];
          } else {
            accessToken = userData.accessToken;
          }
          refreshUser(userData.user);
          setCookie("refreshToken", userData.refreshToken);
          return accessToken;
        }
        if (isRefreshError) {
          console.log("refresh token failed");
        }
      }
    }
    if (isGetUserError) {
      logout();
      history.replace({
        pathname: "/login",
        state: {
          from: location,
        },
      });
    }
  }, [
    getUser,
    isAuth,
    isGetUserLoading,
    isGetUserSuccess,
    isGetUserError,
    isRefreshError,
    isRefreshSuccess,
    loginSuccess,
    refreshToken,
    refreshTokenPost,
    refreshUser,
    token,
    userData,
    history,
    location,
    logout,
  ]);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isAuth ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
