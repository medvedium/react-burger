import React from "react";
import styles from "./profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import ProfilePersonal from "../../components/profile-personal/profile-personal";

const ProfilePage = () => {
  return (
    <div className={styles.profile_page}>
      <ProfileNav />
      <ProfilePersonal />
    </div>
  );
};

export default ProfilePage;
