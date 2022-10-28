import styles from "./profile-personal.module.css";
import React from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

const ProfilePersonal = () => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setValue(e.target.value)}
        icon={"EditIcon"}
        value={value}
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
        onChange={(e) => setValue(e.target.value)}
        icon={"EditIcon"}
        value={value}
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
        onChange={(e) => setValue(e.target.value)}
        icon={"EditIcon"}
        value={value}
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
