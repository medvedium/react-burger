import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./header-login.module.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";

const HeaderLogin = () => {
  let pageIsActive = true;
  const history = useHistory();
  // useEffect(() => {
  //   console.log(history);
  // });
  return (
    <Link
      to="/profile"
      className={`${styles.headerLogin} ${pageIsActive ? "active" : "primary"}`}
    >
      <ProfileIcon type={pageIsActive ? "primary" : "secondary"} />
      <p
        className={`text text_type_main-default ml-2 ${
          pageIsActive ? "" : "text_color_inactive"
        }`}
      >
        Личный кабинет
      </p>
    </Link>
  );
};

export default HeaderLogin;
