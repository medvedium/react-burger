import React /*, { useContext }*/ from "react";
import styles from "./order-details.module.css";
import done from "../../images/done.svg";
// import { IngredientsContext } from "../../utils/ingredients-context";

const OrderDetails = () => {
  // const ingredients = useContext(IngredientsContext);

  return (
    <div className={styles.order_details}>
      <p className="text text_type_digits-large mb-8">034536</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
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
