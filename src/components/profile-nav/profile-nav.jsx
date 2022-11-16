import styles from "./profile-nav.module.css";
import React, { useEffect } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
// import {
//   checkUser,
//   LOGOUT_SUCCESS,
//   RESET_USER,
// } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie, getCookie } from "../../utils/api";
import { useLogoutMutation } from "../../store/api";
import { useAppSelector } from "../../hooks/redux";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const token = document.cookie ? getCookie("refreshToken") : "";
  const { isAuth } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  // useEffect(() => {
  //   dispatch(checkUser(token));
  // }, [dispatch, isAuth, token]);

  const handleLogout = () => {
    logout(token)
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
        // dispatch({ type: RESET_USER });
        // dispatch({ type: LOGOUT_SUCCESS });
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
