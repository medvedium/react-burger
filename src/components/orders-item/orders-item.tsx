import React from "react";
import styles from "./orders-item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";
import {ILocationState} from "../../models/models";
import {useAppSelector} from "../../hooks/redux";

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
  item: IOrder
}
const OrdersItem = ({item}: OrdersItemProps) => {
  const location = useLocation<ILocationState>()

  const {items} = useAppSelector(state => state.ingredients)

  return (
    <Link to={{
      pathname: `${location.pathname}/${item._id}`,
      state: { background: location },
    }}>
      <div className={`${styles.item} p-6 mb-4`}>
        <div className={`${styles.top} mb-6`}>
          <p className="text text_type_digits-default">#{item.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {item.createdAt.toString()}
          </p>
        </div>
        <div className="mb-6">
          <p className="text text_type_main-medium">
            {item.name}
          </p>
        </div>
        <div className={styles.main}>
          <div className={styles.list}>
            {item && items && item.ingredients.map((neededId, index) => {
              const find = items.find(ingr => ingr._id === neededId)
              if (index < 5) {
                return <div key={index} className={styles.element}><img src={`${find?.image_mobile}`} alt={`${find?.name}`}/></div>
              }
              if (index === 5) {
                return <div key={index} className={styles.element}><img src={`${find?.image_mobile}`} alt={`${find?.name}`}/><p className="text text_type_main-default">+{item.ingredients.length - 5}</p></div>
              }
            })}
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">480</p>
            <CurrencyIcon type={"primary"}/>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrdersItem;
