import React from "react";
import styles from "./profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import ProfilePersonal from "../../components/profile-personal/profile-personal";
import { Redirect, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { ILocationState } from "../../models/models";

const ProfilePage = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  const location = useLocation<ILocationState>();

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
