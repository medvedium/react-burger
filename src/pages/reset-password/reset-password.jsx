import React, { useEffect, useRef } from "react";
import styles from "../forgot-password/forgot-password.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { getCookie, setNewPasswordPost } from "../../utils/api";
import { _PASSWORD_RESET_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../services/actions/auth";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = document.cookie ? getCookie("token") : "";
  const { isAuth } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, token]);

  const [state, setState] = React.useState({ password: "", token: "" });
  const onChange = (e) => {
    const { target } = e;
    const value = target.value;
    const { name } = target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const inputRef = useRef();

  const setNewPassword = (e) => {
    e.preventDefault();
    setNewPasswordPost(_PASSWORD_RESET_URL, state.password, state.token)
      .then(() => {})
      .catch((err) => console.log(err));
  };

  if (!isAuth && location?.state?.from.pathname === "/forgot-password") {
    return (
      <form
        className={styles.forgot_password_wrap}
        onSubmit={(e) => setNewPassword(e)}
      >
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <PasswordInput
          onChange={(e) => onChange(e)}
          value={state.password}
          name={"password"}
          placeholder={"Введите новый пароль"}
          extraClass={"mb-6"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => onChange(e)}
          value={state.token}
          name={"token"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass="mb-20"
        >
          Сохранить
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
    return (
      <Redirect to={location?.state?.from.pathname || "/forgot-password"} />
    );
  }
};

export default ResetPasswordPage;
