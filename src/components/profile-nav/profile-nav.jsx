import styles from "./profile-nav.module.css";
import React from "react";
import { Link } from "react-router-dom";

const ProfileNav = () => {
  return (
    <div className={`${styles.profile_nav} mr-15`}>
      <Link to="/profile/">
        <p className="text text_type_main-medium pt-4 pr-4 pb-4 ">Профиль</p>
      </Link>
      <Link to="/profile/">
        <p className="text text_type_main-medium pt-4 pr-4 pb-4 text_color_inactive">
          История заказов
        </p>
      </Link>
      <Link to="/profile/" className={"mb-20"}>
        <p className="text text_type_main-medium pt-4 pr-4 pb-4 text_color_inactive">
          Выход
        </p>
      </Link>

      <div className={styles.profile_description}>
        В этом разделе вы можете изменить свои персональные данные
      </div>
    </div>
  );
};

export default ProfileNav;
