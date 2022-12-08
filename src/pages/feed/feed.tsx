import React, { useEffect } from "react";
import styles from "./feed.module.css";
import OrdersList from "../../components/orders-list/orders-list";
import FeedHistory from "../../components/feed-history/feed-history";
import { useActions } from "../../hooks/actions";
import { _WS_URL } from "../../utils/constants";

const FeedPage = () => {
  const { open, close } = useActions();
  useEffect(() => {
    open({
      url: `${_WS_URL}/all`,
    });

    return () => {
      close();
    };
  });

  return (
    <>
      <h1>
        <p className="text text_type_main-large mb-8">Лента заказов</p>
      </h1>
      <section className={styles.container}>
        <OrdersList />
        <FeedHistory />
      </section>
    </>
  );
};

export default FeedPage;
