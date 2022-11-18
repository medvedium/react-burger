import React, { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie, setCookie } from "../../utils/cookie";
import { useAppSelector } from "../../hooks/redux";
import { useLazyGetUserQuery, useRefreshTokenMutation } from "../../store/api";
import { useActions } from "../../hooks/actions";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { loginSuccess, refreshUser } = useActions();
  const token = document.cookie ? getCookie("token") : "";
  const refreshToken = document.cookie ? getCookie("refreshToken") : "";
  const [getUser, { isError: isGetUserError, isSuccess: isGetUserSuccess }] =
    useLazyGetUserQuery();
  const [
    refreshTokenPost,
    {
      isError: isRefreshError,
      isLoading: isRefreshLoading,
      isSuccess: isRefreshSuccess,
    },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    if (!isGetUserError && !isGetUserSuccess) {
      getUser(token)
        .unwrap()
        .then((res) => {
          loginSuccess();
          refreshUser(res);
        })
        .catch(() => {});
    } else if (!isRefreshError && !isRefreshLoading && !isRefreshSuccess) {
      refreshTokenPost(refreshToken)
        .unwrap()
        .then((res) => {
          const authToken = res.accessToken.split("Bearer ")[1];
          if (authToken) {
            setCookie("token", authToken);
            setCookie("refreshToken", res.refreshToken);
          }
          refreshUser(res);
        })
        .catch(() => {});
    }
  });

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
