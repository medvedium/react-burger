import React from "react";
import styles from "./orders-item.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { ILocationState } from "../../models/models";
import { useAppSelector } from "../../hooks/redux";

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
}

export interface OrdersItemProps {
  item: IOrder;
}
const OrdersItem = ({ item }: OrdersItemProps) => {
  const location = useLocation<ILocationState>();
  const { items } = useAppSelector((state) => state.ingredients);

  let total = 0;
  items.map((ingr) => {
    if (item.ingredients.indexOf(ingr._id) >= 0) {
      let idx = item.ingredients.indexOf(ingr._id);
      let indices = [];
      while (idx !== -1) {
        indices.push(idx);
        idx = item.ingredients.indexOf(ingr._id, idx + 1);
      }
      if (ingr.type === "bun") {
        total += ingr.price * 2;
      } else {
        total += +ingr.price * indices.length;
      }
    }
    return null;
  });

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${item._id}`,
        state: { background: location, total: total },
      }}
    >
      <div className={`${styles.item} p-6 mb-4`}>
        <div className={`${styles.top} mb-6`}>
          <p className="text text_type_digits-default">#{item.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(item.createdAt)} />
          </p>
        </div>
        <div className="mb-2">
          <p className="text text_type_main-medium">{item.name}</p>
        </div>
        {location.pathname === "/profile/orders" && (
          <p
            className={`${
              item.status === "done" && "text_color_success"
            } text text_type_main-default`}
          >
            {item.status === "created" && "Создан"}
            {item.status === "pending" && "Готовится"}
            {item.status === "done" && "Выполнен"}
          </p>
        )}
        <div className={`${styles.main} mt-6`}>
          <div className={styles.list}>
            {item &&
              items &&
              item.ingredients.map((neededId, index) => {
                const find = items.find((ingr) => ingr._id === neededId);
                if (index < 5) {
                  return (
                    <div key={index} className={styles.element}>
                      <img
                        src={`${find?.image_mobile}`}
                        alt={`${find?.name}`}
                      />
                    </div>
                  );
                }
                if (index === 5) {
                  return (
                    <div key={index} className={styles.element}>
                      <img
                        src={`${find?.image_mobile}`}
                        alt={`${find?.name}`}
                      />
                      <p className="text text_type_main-default">
                        +{item.ingredients.length - 5}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">{total}</p>
            <CurrencyIcon type={"primary"} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrdersItem;
