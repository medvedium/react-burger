import React, { useEffect } from "react";
import styles from "./profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import ProfilePersonal from "../../components/profile-personal/profile-personal";
import { getCookie } from "../../utils/api";
import { Redirect, useLocation } from "react-router-dom";
// import { checkUser } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../hooks/redux";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const token = document.cookie ? getCookie("token") : "";
  const { isAuth } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(checkUser(token));
  // }, [dispatch, isAuth, token]);

  const location = useLocation();

  if (isAuth) {
    return (
      <div className={styles.profile_page}>
        <ProfileNav />

        <ProfilePersonal />
      </div>
    );
  } else {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }
};

export default ProfilePage;
