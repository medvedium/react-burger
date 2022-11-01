import React, { useEffect } from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../services/actions/auth";
import { useDispatch, useSelector, useStore } from "react-redux";

const LoginPage = () => {
  const history = useHistory();
  const { isAuth } = useSelector((store) => store.userData);

  useEffect(() => {
    if (isAuth) {
      history.replace("/");
    }
  }, [isAuth]);

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
  const dispatch = useDispatch();

  return (
    <div className={styles.login_wrap}>
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
      <Button
        type="primary"
        size="medium"
        htmlType="submit"
        extraClass="mb-20"
        onClick={() => dispatch(login(postData))}
      >
        Войти
      </Button>
      <p className="text text_type_main-default mb-4">
        Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default">
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default LoginPage;
