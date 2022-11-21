import React, { FormEvent } from "react";
import styles from "../forgot-password/forgot-password.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../../store/api";
import { useAppSelector } from "../../hooks/redux";
import { ILocationState } from "../../models/models";

const ResetPasswordPage = () => {
  const location = useLocation<ILocationState>();
  const history = useHistory();
  const { isAuth } = useAppSelector((state) => state.auth);

  const [state, setState] = React.useState({ password: "", token: "" });
  const [resetPassword] = useResetPasswordMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const value = target.value;
    const { name } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const setNewPassword = (e: FormEvent) => {
    e.preventDefault();
    resetPassword(state)
      .unwrap()
      .then(() => {
        history.replace({
          pathname: "/login",
          state: {
            from: location,
          },
        });
      });
  };

  if (!isAuth && location?.state?.from.pathname === "/forgot-password") {
    return (
      <form
        className={styles.forgot_password_wrap}
        onSubmit={(e) => setNewPassword(e)}
      >
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <PasswordInput
          onChange={onChange}
          value={state.password}
          name={"password"}
          placeholder={"Введите новый пароль"}
          extraClass={"mb-6"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={state.token}
          name={"token"}
          error={false}
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
