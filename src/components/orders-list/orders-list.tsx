import React from "react";
import OrdersItem from "../orders-item/orders-item";
import styles from "./orders-list.module.css";
import { useAppSelector } from "../../hooks/redux";

const OrdersList = () => {
  const { orders } = useAppSelector((state) => state.ws.message);

  return (
    <section className={`${styles.orders_list} custom-scroll`}>
      {orders ? (
        orders.map((item) => <OrdersItem key={item._id} item={item} />)
      ) : (
        <p className="text text_type_main-medium p-4">Заказов не найдено</p>
      )}
    </section>
  );
};

export default OrdersList;
