import React from "react";
import styles from "./order-details.module.css";
import done from "../../images/done.svg";

interface OrderDetailsProps {
  name: string;
  number: number;
}

const OrderDetails = ({ name, number }: OrderDetailsProps) => {
  return (
    <div className={styles.order_details}>
      <p className="text text_type_digits-large mb-8">{number}</p>
      <p className={`${styles.order_name} text text_type_main-medium mb-15`}>
        {name}
      </p>
      <img src={done} className="mb-15" alt="Заказ успешно оформлен" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
