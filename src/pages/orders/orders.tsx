import React, { useEffect } from "react";
import styles from "../profile/profile.module.css";
import ProfileNav from "../../components/profile-nav/profile-nav";
import OrdersList from "../../components/orders-list/orders-list";
import { useActions } from "../../hooks/actions";
import { _WS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

const OrdersPage = () => {
  const { open, close } = useActions();
  const accessToken = getCookie("token");
  useEffect(() => {
    open({ url: `${_WS_URL}?token=${accessToken}` });

    return () => {
      close();
    };
  });
  return (
    <div className={styles.profile_page}>
      <ProfileNav />
      <OrdersList />
    </div>
  );
};

export default OrdersPage;
