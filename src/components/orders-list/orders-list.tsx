import React, { useEffect } from "react";
import OrdersItem from "../orders-item/orders-item";
import styles from "./orders-list.module.css";
import { useSubscribeToEventsQuery } from "../../store/api";

const OrdersList = () => {
  const { data } = useSubscribeToEventsQuery();


  let orders: any = [];

  useEffect(() => {
    if (!!data && !!data[0]) {
			orders = [...data[0].orders]
    }
  }, [data]);

  return (
    <section className={`${styles.orders_list} custom-scroll`}>
			{!!data && !!data[0] && data[0].orders.map((item: any) => <OrdersItem key={item._id} item={item}/>)}
    </section>
  );
};

export default OrdersList;
