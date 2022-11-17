import styles from "./profile-personal.module.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useAppSelector } from "../../hooks/redux";
import { getCookie } from "../../utils/cookie";
import { usePatchUserDataMutation } from "../../store/api";
import { useActions } from "../../hooks/actions";

const ProfilePersonal = () => {
  const { name, email, password } = useAppSelector((store) => store.auth);
  const [isChanged, setChanged] = useState(false);
  const token = document.cookie ? getCookie("token") : "";
  const [patchUserData] = usePatchUserDataMutation();
  const { refreshUser } = useActions();

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      email: email,
      password: password,
      name: name,
    });

  useEffect(() => {
    if (
      email === values.email &&
      password === values.password &&
      name === values.name
    ) {
      setChanged(false);
    } else setChanged(true);
  }, [values, name, email, password, isChanged]);

  const submitForm = (event) => {
    event.preventDefault();
    const userData = {
      token,
      ...values,
    };
    patchUserData(userData)
      .then(() => {
        refreshUser(values);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={(event) => submitForm(event)}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => handleChange(e)}
          value={values.name || ""}
          name={"name"}
          error={isValid === false}
          errorText={errors.name || ""}
          extraClass="mb-6"
        />
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={(e) => handleChange(e)}
          value={values.email || ""}
          name={"email"}
          error={isValid === false}
          errorText={errors.email || ""}
          extraClass="mb-6"
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={(e) => handleChange(e)}
          value={values.password || ""}
          name={"password"}
          error={isValid === false}
          errorText={errors.password || ""}
          extraClass={"mb-6"}
          autoComplete={"off"}
        />
        <div
          className={`${styles.button_container} ${
            !isChanged ? styles.hidden : ""
          }`}
        >
          <Button
            type="primary"
            htmlType="button"
            onClick={() => resetForm({ name, email, password })}
          >
            Отменить
          </Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePersonal;
