import styles from "./profile-nav.module.css";
import React from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { logout } from "../../services/actions/auth";
import { deleteCookie, getCookie } from "../../utils/api";

const ProfileNav = (refreshToken) => {
  const history = useHistory();
  const location = useLocation();
  let isAuth = document.cookie.includes("refreshToken");
  const handleLogout = () => {
    deleteCookie("refreshToken", refreshToken);
    history.replace("/login");
  };

  if (isAuth) {
    return (
      <div className={`${styles.profile_nav} mr-15`}>
        <Link to="/profile/">
          <p className="text text_type_main-medium pt-4 pr-4 pb-4 ">Профиль</p>
        </Link>
        <Link to="/profile/orders">
          <p className="text text_type_main-medium pt-4 pr-4 pb-4 text_color_inactive">
            История заказов
          </p>
        </Link>
        <button
          className={`${styles.logout_button} mb-20`}
          onClick={handleLogout}
        >
          <p className="text text_type_main-medium pt-4 pr-4 pb-4 text_color_inactive">
            Выход
          </p>
        </button>

        <div className={styles.profile_description}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>
    );
  } else {
    return <Redirect to={location?.state?.from || "/"} />;
  }
};

export default ProfileNav;
