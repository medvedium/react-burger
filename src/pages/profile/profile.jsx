import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import ProfilePersonal from "../../components/profile-personal/profile-personal";
import { useDispatch, useSelector } from "react-redux";
import { getCookie, getUserRequest } from "../../utils/api";
import {
  BrowserRouter,
  Redirect,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import { refreshUserData } from "../../services/actions/auth";

const ProfilePage = () => {
  const accessToken = useSelector((state) => state.userData.token);
  const isAuth = document.cookie.includes("refreshToken");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  let userData;
  const [user, setUser] = useState(null);
  const refreshToken = document.cookie.includes("refreshToken")
    ? getCookie("refreshToken")
    : "";
  useEffect(() => {
    getUserRequest(accessToken)
      .then((res) => {
        userData = res.user;
        if (userData) {
          setUser(userData);
        }
      })
      .catch(() => {
        isAuth
          ? dispatch(refreshUserData(refreshToken))
          : history.replace({
              pathname: "/login",
              state: { from: location.pathname },
            });
      });
  }, [accessToken]);

  if (isAuth) {
    return (
      <div className={styles.profile_page}>
        <ProfileNav refreshToken={refreshToken} />

        <ProfilePersonal userData={user} />
      </div>
    );
  } else {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }
};

export default ProfilePage;
