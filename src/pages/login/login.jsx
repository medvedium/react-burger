import React, { useEffect } from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { useForm } from "../../hooks/useForm";
import {
  useLazyGetUserQuery,
  useLoginMutation,
  useRefreshTokenMutation,
} from "../../store/api";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";

const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [login] = useLoginMutation();
  const { setUser, loginSuccess, refreshUser } = useActions();
  const token = document.cookie ? getCookie("token") : "";
  const refreshToken = document.cookie ? getCookie("refreshToken") : "";
  const [
    getUser,
    { isSuccess: isGetUserSuccess, isError: isGetUserError, data: userData },
  ] = useLazyGetUserQuery();
  const [
    refreshTokenPost,
    { isSuccess: isRefreshSuccess, isError: isRefreshError },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    if (token !== undefined && token !== "" && !isAuth) {
      console.log(`login`);
      getUser(token);
      if (isGetUserSuccess) {
        loginSuccess();
        refreshUser(userData);
      }
      if (isGetUserError) {
        refreshTokenPost(refreshToken);
        if (isRefreshSuccess) {
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
  }, [token, history, loginSuccess, refreshTokenPost, refreshUser]);

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login(values)
      .unwrap()
      .then((res) => {
        let accessToken;
        if (res.accessToken.indexOf("Bearer") === 0)
          accessToken = res.accessToken.split("Bearer ")[1];
        else accessToken = res.accessToken;
        setUser({ ...res.user, password: values.password });
        setCookie("refreshToken", res.refreshToken);
        setCookie("token", accessToken);
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
