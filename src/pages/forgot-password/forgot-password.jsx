import React from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { resetPasswordPost } from "../../utils/api";
import { _EMAIL_RESET_URL } from "../../utils/constants";

const ForgotPasswordPage = () => {
  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const sendEmailRequest = (email) => {
    resetPasswordPost(_EMAIL_RESET_URL, email).then(() => {
      history.replace({ pathname: "/reset-password" });
    });
  };

  return (
    <div className={styles.forgot_password_wrap}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <EmailInput
        onChange={(e) => onChange(e)}
        value={email}
        name={"email"}
        placeholder={"Укажите e-mail"}
        extraClass={"mb-6"}
      />
      <Button
        type="primary"
        size="medium"
        htmlType="submit"
        extraClass="mb-20"
        onClick={(e) => sendEmailRequest(email)}
      >
        Восстановить
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

export default ForgotPasswordPage;
