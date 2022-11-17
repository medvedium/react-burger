import React, { useEffect } from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import {
  useForgotPasswordMutation,
  useLazyGetUserQuery,
  useRefreshTokenMutation,
} from "../../store/api";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";

const ForgotPasswordPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { loginSuccess, refreshUser, logout } = useActions();
  const token = document.cookie ? getCookie("token") : "";
  const refreshToken = document.cookie ? getCookie("refreshToken") : "";
  const [
    getUser,
    { isSuccess: isGetUserSuccess, isLoading: isGetUserLoading, isError: isGetUserError, data: userData },
  ] = useLazyGetUserQuery();
  const [
    refreshTokenPost,
    { isSuccess: isRefreshSuccess, isError: isRefreshError },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    if (!isGetUserError) {
      console.log('login')
      getUser(token);
      if (isGetUserSuccess) {
        loginSuccess();
        refreshUser(userData);
      }
      if (isGetUserError && refreshToken !== undefined && refreshToken !== '') {
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
  }, [getUser, isAuth, isGetUserLoading, isGetUserSuccess, isGetUserError, isRefreshError, isRefreshSuccess, loginSuccess, refreshToken, refreshTokenPost, refreshUser, token, userData]);

  const { values, handleChange, errors, isValid } = useFormAndValidation({});
  const [remindPassword] = useForgotPasswordMutation();

  const email = values.email;

  const submitForm = (e, email) => {
    console.log(email);
    e.preventDefault();
    remindPassword(email)
      .unwrap()
      .then(() => {
        history.replace({
          pathname: "/reset-password",
          state: {
            from: location,
          },
        });
      });
  };

  if (!isAuth) {
    return (
      <form
        className={styles.forgot_password_wrap}
        onSubmit={(e) => submitForm(e, email)}
      >
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <EmailInput
          size={"default"}
          onChange={(e) => handleChange(e)}
          value={values.email || ""}
          error={isValid === false}
          errorText={errors.email || ""}
          name={"email"}
          placeholder={"Укажите e-mail"}
          extraClass={"mb-6 m0-a"}
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
        <p className="text text_type_main-default mb-4 text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to="/login" className={"text text_type_main-default"}>
            Войти
          </Link>
        </p>
      </form>
    );
  } else {
    return <Redirect to={location?.state?.from.pathname || "/"} />;
  }
};

export default ForgotPasswordPage;
