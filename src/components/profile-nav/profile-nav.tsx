import styles from "./profile-nav.module.css";
import React from "react";
import { NavLink, Redirect, useHistory, useLocation } from "react-router-dom";
import { deleteCookie, getCookie } from "../../utils/cookie";
import { useLogoutMutation } from "../../store/api";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";
import { ILocationState } from "../../models/models";

const ProfileNav = () => {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const token: string | undefined = document.cookie
    ? getCookie("refreshToken")
    : undefined;
  const { isAuth } = useAppSelector((state) => state.auth);
  const [logoutRequest] = useLogoutMutation();
  const { logout } = useActions();

  const handleLogout = () => {
    logoutRequest(token)
      .then(() => {
        const oldTokenCookie: string | undefined = getCookie("refreshToken");
        const oldAccessTokenCookie: string | undefined = getCookie("token");
        deleteCookie("refreshToken", oldTokenCookie);
        deleteCookie("token", oldAccessTokenCookie);
      })
      .then(() => {
        history.replace("/login");
      })
      .then(() => {
        logout();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isAuth) {
    return (
      <div className={`${styles.profile_nav} mr-15`}>
        <NavLink to="/profile">
          <p
            className={`${
              location.pathname === "/profile" ? "" : "text_color_inactive"
            } text text_type_main-medium pt-4 pr-4 pb-4`}
          >
            Профиль
          </p>
        </NavLink>
        <NavLink to="/profile/orders">
          <p
            className={`${
              location.pathname === "/profile/orders"
                ? ""
                : "text_color_inactive"
            } text text_type_main-medium pt-4 pr-4 pb-4`}
          >
            История заказов
          </p>
        </NavLink>
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
