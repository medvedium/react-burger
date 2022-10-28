import React, { useRef } from "react";
import styles from "../forgot-password/forgot-password.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const inputRef = useRef();
  return (
    <div className={styles.forgot_password_wrap}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <PasswordInput
        onChange={(e) => onChange}
        value={value}
        name={"password"}
        placeholder={"Введите новый пароль"}
        extraClass={"mb-6"}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={(e) => onChange(e)}
        value={value}
        name={"emailReset"}
        error={false}
        ref={inputRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
      <Button type="primary" size="medium" htmlType="submit" extraClass="mb-20">
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
