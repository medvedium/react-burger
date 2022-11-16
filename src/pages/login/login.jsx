import React, { useEffect } from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, Redirect, useLocation } from "react-router-dom";
// import { checkUser, SET_USER } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie, getCookie, setCookie } from "../../utils/api";
import { useForm } from "../../hooks/useForm";
import {
  useGetUserQuery,
  useLoginMutation,
  useRefreshTokenMutation,
} from "../../store/api";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";

const LoginPage = () => {
  const token = document.cookie ? getCookie("token") : "";
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { setUser, loginSuccess, refreshUser } = useActions();
  const { data, isSuccess, isError } = useGetUserQuery(token);
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    isSuccess && loginSuccess();
    if (isError) {
      refreshToken(token)
        .unwrap()
        .then((res) => {
          let accessToken = null;
          deleteCookie("refreshToken", token);
          if (res.accessToken.indexOf("Bearer") === 0) {
            accessToken = res.accessToken.split("Bearer ")[1];
          } else {
            accessToken = res.accessToken;
          }
          refreshUser(res.user);
          setCookie("refreshToken", res.refreshToken);
          return accessToken;
        });
    }
  }, [isAuth, token]);

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
        // dispatch({
        //   type: SET_USER,
        //   user: { ...res.user, password: values.password },
        //   isAuth: true,
        // });
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
