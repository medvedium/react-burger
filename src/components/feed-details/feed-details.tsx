import React from "react";
import styles from "./feed-details.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedDetailsItem from "../feed-details-item/feed-details-item";
import { useLocation, useParams } from "react-router-dom";
import { ILocationState, IOrder } from "../../models/models";
import { useAppSelector } from "../../hooks/redux";

const FeedDetails = () => {
  const location = useLocation<ILocationState>();
  const { id } = useParams<{ id: string }>();
  const { orders, personalOrders } = useAppSelector((state) => state.orders);
  const { items } = useAppSelector((state) => state.ingredients);

  let item: IOrder | undefined;
  if (location.state.background.pathname === "/feed") {
    item = orders.find((order) => order._id === id);
  } else if (location.state.background.pathname === "/profile/orders") {
    item = personalOrders.find((order) => order._id === id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.order_number}>
        <p className="text text_type_digits-default mb-10">
          #{item && item.number}
        </p>
      </div>
      <div className={styles.order_name}>
        <p className="text text_type_main-medium mb-3">{item && item.name}</p>
      </div>
      <div className={styles.order_status}>
        <p
          className={`${
            item && item.status === "done" && "text_color_success"
          } text text_type_main-default mb-15`}
        >
          {item && item.status === "created" && "Создан"}
          {item && item.status === "pending" && "Готовится"}
          {item && item.status === "done" && "Выполнен"}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`${styles.list} mb-10 custom-scroll`}>
        {items.map((ingr) => {
          if (item && item.ingredients.indexOf(ingr._id) >= 0) {
            let idx = item.ingredients.indexOf(ingr._id);
            let indices = [];
            while (idx !== -1) {
              indices.push(idx);
              idx = item.ingredients.indexOf(ingr._id, idx + 1);
            }
            if (ingr.type === "bun") {
              return <FeedDetailsItem item={ingr} count={2} />;
            } else {
              return <FeedDetailsItem item={ingr} count={indices.length} />;
            }
          }
          return null;
        })}
      </ul>
      <footer className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {item && <FormattedDate date={new Date(item.createdAt)} />}
        </p>
        <div className={styles.total}>
          <p className="text text_type_digits-default mr-2">
            {location.state.total}
          </p>
          <CurrencyIcon type={"primary"} />
        </div>
      </footer>
    </div>
  );
};

export default FeedDetails;
