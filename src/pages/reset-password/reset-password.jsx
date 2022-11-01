import React, { useRef } from "react";
import styles from "../forgot-password/forgot-password.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { setNewPasswordPost } from "../../utils/api";
import { _PASSWORD_RESET_URL } from "../../utils/constants";

const ResetPasswordPage = () => {
  const history = useHistory();

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

  const setNewPassword = () => {
    setNewPasswordPost(_PASSWORD_RESET_URL, state.password, state.token)
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.forgot_password_wrap}>
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
        onClick={setNewPassword}
      >
        Сохранить
      </Button>
      <p className="text text_type_main-default mb-4 text_color_inactive">
        Вспомнили пароль?{" "}
        <Link to="/login" className={"text text_type_main-default"}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
