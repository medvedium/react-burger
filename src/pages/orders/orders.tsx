import React from "react";
import styles from "../profile/profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";

const OrdersPage = () => {
  return (
    <div className={styles.profile_page}>
      <ProfileNav />

      <div>Ваши заказы</div>
    </div>
  );
};

export default OrdersPage;
