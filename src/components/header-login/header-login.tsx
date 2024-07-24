import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./header-login.module.css";
import { Link, useLocation } from "react-router-dom";
import { ILocationState } from "../../models/models";

const HeaderLogin = () => {
  const location = useLocation<ILocationState>();
  const pageIsActive = location.pathname.includes("profile");

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
