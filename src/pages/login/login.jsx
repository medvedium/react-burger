import React from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.login_wrap}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <EmailInput
        onChange={(e) => onChange}
        value={value}
        name={"email"}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={(e) => onChange}
        value={value}
        name={"password"}
        extraClass="mb-6"
      />
      <Button type="primary" size="medium" htmlType="submit" extraClass="mb-20">
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
