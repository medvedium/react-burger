import React from "react";
import OrdersItem from "../orders-item/orders-item";
import styles from "./orders-list.module.css";
import { useGetOrdersQuery } from "../../store/api";
import Loader from "../loader/loader";

const OrdersList = () => {
  const { data, isFetching } = useGetOrdersQuery();

  if (isFetching) return <Loader />;
  else
    return (
      <section className={`${styles.orders_list} custom-scroll`}>
        {!!data && !!data[0] && data[0].orders.length ? (
          data[0].orders.map((item: any) => (
            <OrdersItem key={item._id} item={item} />
          ))
        ) : (
          <p className="text text_type_main-medium p-4">Заказов не найдено</p>
        )}
      </section>
    );
};

export default OrdersList;
