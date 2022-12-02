import React from "react";
import styles from "../profile/profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import OrdersList from "../../components/orders-list/orders-list";
import PersonalOrdersList from "../../components/personal-orders-list/personal-orders-list";

const OrdersPage = () => {

  return (
    <div className={styles.profile_page}>
      <ProfileNav />

      <PersonalOrdersList />
    </div>
  );
};

export default OrdersPage;
