import React, { useEffect } from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { getCookie, resetPasswordPost } from "../../utils/api";
import { _EMAIL_RESET_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../services/actions/auth";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const token = document.cookie ? getCookie("token") : "";
  const { isAuth } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, isAuth, token]);

  const [email, setEmail] = React.useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const sendEmailRequest = (e, email) => {
    e.preventDefault();
    resetPasswordPost(_EMAIL_RESET_URL, email).then(() => {
      history.replace({
        pathname: "/reset-password",
        state: {
          from: location,
        },
      });
    });
  };

  if (!isAuth) {
    return (
      <form
        className={styles.forgot_password_wrap}
        onSubmit={(e) => sendEmailRequest(e, email)}
      >
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
        >
          Восстановить
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
    return <Redirect to={location?.state?.from.pathname || "/"} />;
  }
};

export default ForgotPasswordPage;
