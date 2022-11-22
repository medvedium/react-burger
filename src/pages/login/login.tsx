import React, { FormEvent, useEffect } from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
import { getCookie, setCookie } from "../../utils/cookie";
import { useForm } from "../../hooks/useForm";
import {
  useGetUserQuery,
  useLoginMutation,
  useRefreshTokenMutation,
} from "../../store/api";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";
import { ILocationState } from "../../models/models";
import { RootState } from "../../store";

const LoginPage = () => {
  const location = useLocation<ILocationState>();
  const { isAuth } = useAppSelector((state: RootState) => state.auth);
  const [login] = useLoginMutation();
  const { setUser, loginSuccess, refreshUser } = useActions();
  const token = document.cookie ? getCookie("token") : "";
  const refreshToken = document.cookie ? getCookie("refreshToken") : "";
  const {
    isSuccess: isGetUserSuccess,
    isError: isGetUserError,
    data: userData,
  } = useGetUserQuery(token);
  const [
    refreshTokenPost,
    {
      isLoading: isRefreshLoading,
      isSuccess: isRefreshSuccess,
      data: refreshData,
    },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    isGetUserSuccess && loginSuccess();
    isGetUserSuccess && refreshUser(userData);

    if (!isRefreshLoading && isGetUserError && refreshToken) {
      refreshTokenPost(refreshToken);
      if (isRefreshSuccess && refreshData) {
        let authToken;
        if (refreshData.accessToken) {
          authToken = refreshData.accessToken.split("Bearer ")[1];
        }
        if (authToken) {
          setCookie("token", authToken);
          setCookie("refreshToken", refreshData.refreshToken);
        }
      }
    }
  });

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login(values)
      .unwrap()
      .then((res) => {
        if (res) {
          let accessToken;
          if (res.accessToken) {
            if (res.accessToken.indexOf("Bearer") === 0)
              accessToken = res.accessToken.split("Bearer ")[1];
            else accessToken = res.accessToken;
          }
          setUser({ ...res.user, password: values.password });
          setCookie("refreshToken", res.refreshToken);
          setCookie("token", accessToken);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!isAuth) {
    return (
      <form className={styles.login_wrap} onSubmit={handleLogin}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <EmailInput
          onChange={(e) => handleChange(e)}
          value={values.email || ""}
          name={"email"}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => handleChange(e)}
          value={values.password || ""}
          name={"password"}
          extraClass="mb-6"
        />
        <Button type="primary" htmlType="submit" extraClass="mb-20">
          Войти
        </Button>
        <p className="text text_type_main-default mb-4">
          Вы — новый пользователь?{" "}
          <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default">
          Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </form>
    );
  } else {
    return <Redirect to={location?.state?.from.pathname || "/"} />;
  }
};

export default LoginPage;
