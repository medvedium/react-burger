import React, { useRef } from "react";
import styles from "./register.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const inputRef = useRef();
  return (
    <div className={styles.register_wrap}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name={"name"}
        error={false}
        ref={inputRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />
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
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default mb-4">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
