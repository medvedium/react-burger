import styles from "./profile-nav.module.css";
import React from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { deleteCookie, getCookie } from "../../utils/cookie";
import { useLogoutMutation } from "../../store/api";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";

const ProfileNav = () => {
  const history = useHistory();
  const location = useLocation();
  const token = document.cookie ? getCookie("refreshToken") : "";
  const { isAuth } = useAppSelector((state) => state.auth);
  const [logoutRequest] = useLogoutMutation();
  const { logout } = useActions();

  const handleLogout = () => {
    logoutRequest(token)
      .then(() => {
        const oldTokenCookie = getCookie("refreshToken");
        const oldAccessTokenCookie = getCookie("token");
        deleteCookie("refreshToken", oldTokenCookie);
        deleteCookie("token", oldAccessTokenCookie);
      })
      .then(() => {
        history.replace("/login");
      })
      .then(() => {
        logout();
      })
      .catch((res) => {
        console.log(res);
      });
  };

  if (isAuth) {
    return (
      <div className={`${styles.profile_nav} mr-15`}>
        <Link to="/profile">
          <p
            className={`${
              location.pathname === "/profile" ? "" : "text_color_inactive"
            } text text_type_main-medium pt-4 pr-4 pb-4`}
          >
            Профиль
          </p>
        </Link>
        <Link to="/profile/orders">
          <p
            className={`${
              location.pathname === "/profile/orders"
                ? ""
                : "text_color_inactive"
            } text text_type_main-medium pt-4 pr-4 pb-4`}
          >
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
