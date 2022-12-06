import styles from "./feed-history.module.css";
import React from "react";
import { useAppSelector } from "../../hooks/redux";

const FeedHistory = () => {
  const { total, totalToday, orders } = useAppSelector((state) => state.orders);

  return (
    <section className={styles.history}>
      <div className={`${styles.orders_wrap} mb-15`}>
        <div className={`${styles.orders_ready} ${styles.orders}`}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <div className={styles.orders_inner}>
            {orders &&
              orders.map(
                (order, index) =>
                  order.status === "done" &&
                  index < 20 && (
                    <p
                      className="text text_type_digits-default text_color_success mb-2"
                      key={index}
                    >
                      {order.number}
                    </p>
                  )
              )}
          </div>
        </div>
        <div className={`${styles.orders_ready} ${styles.orders}`}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <div className={styles.orders_inner}>
            {orders &&
              orders.map(
                (order, index) =>
                  order.status !== "done" && (
                    <p
                      className="text text_type_digits-default mb-2"
                      key={index}
                    >
                      {order.number}
                    </p>
                  )
              )}
          </div>
        </div>
      </div>
      <div className={`${styles.orders_total} mb-15`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>

      <div className={styles.orders_today}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </section>
  );
};

export default FeedHistory;
