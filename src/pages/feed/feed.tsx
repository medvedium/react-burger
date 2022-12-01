import React from "react";
import styles from "./feed.module.css";
import OrdersList from "../../components/orders-list/orders-list";
import FeedHistory from "../../components/feed-history/feed-history";

const FeedPage = () => {
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
