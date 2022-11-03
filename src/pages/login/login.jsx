import React, { useEffect } from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { checkUser, login } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/api";

const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuth } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const token = document.cookie ? getCookie("token") : "";

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, isAuth, token]);

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { target } = e;
    const value = target.value;
    const { name } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const postData = {
    email: state.email,
    password: state.password,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(postData, history));
  };

  if (!isAuth) {
    return (
      <form className={styles.login_wrap} onSubmit={(e) => handleLogin(e)}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <EmailInput
          onChange={(e) => onChange(e)}
          value={state.email}
          name={"email"}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => onChange(e)}
          value={state.password}
          name={"password"}
          extraClass="mb-6"
        />
        <Button type="primary" htmlType="submit" extraClass="mb-20">
          Войти
        </Button>
        <p className="text text_type_main-default mb-4">
          Вы — новый пользователь?{" "}
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
