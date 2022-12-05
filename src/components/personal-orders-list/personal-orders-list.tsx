import React, { useEffect } from "react";
import OrdersItem from "../orders-item/orders-item";
import styles from "../orders-list/orders-list.module.css";
import { useGetPersonalOrdersQuery } from "../../store/api";
import { useActions } from "../../hooks/actions";

const PersonalOrdersList = () => {
  const { data } = useGetPersonalOrdersQuery();
  const { addPersonalOrders } = useActions();

  useEffect(() => {
    !!data && !!data[0] && addPersonalOrders(data[0]);
  }, [data, addPersonalOrders]);

  return (
    <section className={`${styles.orders_list} custom-scroll`}>
      {!!data && !!data[0] && data[0].orders?.length ? (
        data[0].orders.map((item: any) => (
          <OrdersItem key={item._id} item={item} />
        ))
      ) : (
        <p className="text text_type_main-medium p-4">Заказов не найдено</p>
      )}
    </section>
  );
};

export default PersonalOrdersList;
