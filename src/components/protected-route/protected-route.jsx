import React, { useEffect } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { useAppSelector } from "../../hooks/redux";
import { useGetUserQuery, useRefreshTokenMutation } from "../../store/api";
import { useActions } from "../../hooks/actions";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const location = useLocation();
  const history = useHistory();
  const token = document.cookie ? getCookie("token") : "";
  const { isAuth } = useAppSelector((state) => state.auth);
  const { isSuccess, isError, data } = useGetUserQuery(token);
  const { loginSuccess, refreshUser } = useActions();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    if (token) {
      if (isSuccess) {
        loginSuccess();
        refreshUser(data);
      }
      if (isError) {
        refreshToken(token)
          .unwrap()
          .then((res) => {
            let accessToken;
            deleteCookie("refreshToken", token);
            if (res.accessToken.indexOf("Bearer") === 0) {
              accessToken = res.accessToken.split("Bearer ")[1];
            } else {
              accessToken = res.accessToken;
            }
            refreshUser(res.user);
            setCookie("refreshToken", res.refreshToken);
            return accessToken;
          })
          .catch(() => {
            console.log("refresh token failed");
          });
      }
    }
  }, [
    token,
    history,
    isSuccess,
    isError,
    loginSuccess,
    refreshToken,
    refreshUser,
    data,
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
