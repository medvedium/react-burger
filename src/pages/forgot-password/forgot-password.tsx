import React, { FormEvent, useEffect } from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useForgotPasswordMutation, useGetUserQuery } from "../../store/api";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";
import { ILocationState } from "../../models/models";

const ForgotPasswordPage = () => {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { loginSuccess, refreshUser } = useActions();
  const token: string | undefined = document.cookie
    ? getCookie("token")
    : undefined;
  const { isSuccess: isGetUserSuccess, data: userData } =
    useGetUserQuery(token);

  useEffect(() => {
    isGetUserSuccess && loginSuccess();
    isGetUserSuccess && refreshUser(userData);
  }, [isGetUserSuccess, loginSuccess, refreshUser, userData]);

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: "",
  });
  const [remindPassword] = useForgotPasswordMutation();

  const email = values.email;

  const submitForm = (
    e: FormEvent<HTMLFormElement>,
    email: string | undefined
  ) => {
    e.preventDefault();
    remindPassword(email)
      .unwrap()
      .then(() => {
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
        onSubmit={(e) => submitForm(e, email)}
      >
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <EmailInput
          size={"default"}
          onChange={(e) => handleChange(e)}
          value={values.email || ""}
          error={!isValid}
          errorText={errors.email || ""}
          name={"email"}
          placeholder={"Укажите e-mail"}
          extraClass={"mb-6 m0-a"}
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
