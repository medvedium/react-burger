import styles from "./profile-personal.module.css";
import React, { useEffect, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const ProfilePersonal = ({ userData }) => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const { name, email, password } = useSelector((store) => store.userData);

  const [state, setState] = useState({
    name: name,
    email: email,
    password: password,
  });

  const onChange = (e) => {
    const { target } = e;
    const value = target.value;
    const { name } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => onChange(e)}
        icon={"EditIcon"}
        value={state.name}
        name={"Имя"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
        disabled
      />
      <Input
        type={"text"}
        placeholder={"Логин"}
        onChange={(e) => onChange(e)}
        icon={"EditIcon"}
        value={state.email}
        name={"name"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
        disabled
      />
      <Input
        type={"text"}
        placeholder={"Пароль"}
        onChange={(e) => onChange(e)}
        icon={"EditIcon"}
        value={state.password}
        name={"name"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        disabled
      />
    </div>
  );
};

export default ProfilePersonal;
