import React, { useEffect } from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  deleteCookie,
  getCookie,
  refreshTokenRequest,
  setCookie,
} from "../../utils/api";
import { useDispatch } from "react-redux";
// import { REFRESH_USER, refreshUserData } from "../../services/actions/auth";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import {
  useForgotPasswordMutation,
  useGetUserQuery,
  useRefreshTokenMutation,
} from "../../store/api";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const token = document.cookie ? getCookie("token") : "";
  const { isAuth } = useAppSelector((state) => state.auth);
  const [getUser] = useGetUserQuery();
  const { loginSuccess, refreshUser } = useActions();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    getUser(token)
      .unwrap()
      .then(() => {
        loginSuccess();
      })
      .catch(() => {
        const refreshData = {
          token: token,
        };
        refreshToken(refreshData)
          .unwrap()
          .then((res) => {
            let accessToken = null;
            deleteCookie("refreshToken", token);
            if (res.accessToken.indexOf("Bearer") === 0) {
              accessToken = res.accessToken.split("Bearer ")[1];
            } else {
              accessToken = res.accessToken;
            }
            refreshUser(res.user);
            setCookie("refreshToken", res.refreshToken);
            return accessToken;
          });
      });
  }, [isAuth, token]);

  const { values, handleChange, errors, isValid } = useFormAndValidation({});
  const [remindPassword] = useForgotPasswordMutation();

  const email = values.email;

  const submitForm = (e, email) => {
    console.log(email);
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
          error={isValid === false}
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
