import React from "react";
import styles from "../profile/profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import OrdersList from "../../components/orders-list/orders-list";

const OrdersPage = () => {
  return (
    <div className={styles.profile_page}>
      <ProfileNav />
      <OrdersList />
    </div>
  );
};

export default OrdersPage;
