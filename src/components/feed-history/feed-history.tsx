import styles from "./feed-history.module.css";

import React from "react";

const FeedHistory = () => {
  return (
    <section className={styles.history}>
      <div className={`${styles.orders_wrap} mb-15`}>
        <div className={`${styles.orders_ready} ${styles.orders}`}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <div className={styles.orders_inner}>
            <p className="text text_type_digits-default text_color_success mb-2">
              034533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034532
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034530
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034527
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034525
            </p>
          </div>
        </div>
        <div className={`${styles.orders_ready} ${styles.orders}`}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <div className={styles.orders_inner}>
            <p className="text text_type_digits-default mb-2">034538</p>
            <p className="text text_type_digits-default mb-2">034541</p>
            <p className="text text_type_digits-default mb-2">034542</p>
          </div>
        </div>
      </div>
      <div className={`${styles.orders_total} mb-15`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">28 752</p>
      </div>

      <div className={styles.orders_today}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">138</p>
      </div>
    </section>
  );
};

export default FeedHistory;
