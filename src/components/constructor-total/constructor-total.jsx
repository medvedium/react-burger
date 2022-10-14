import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useContext, useEffect, useReducer, useState } from "react";
import { reducer } from "../../utils/total-reducer.js";
import { ConstructorIngredientsContext } from "../../utils/contexts/constructor-ingredients-context";
import { _ORDER_URL } from "../../utils/constants";
import { fetchPost } from "../../utils/api";

const ConstructorTotal = () => {
  const ingredients = useContext(ConstructorIngredientsContext);
  const initialTotalValue = { total: 0 };
  const [modalActive, setModalActive] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [total, totalDispatch] = useReducer(
    reducer,
    initialTotalValue,
    undefined
  );

  const getTotalSum = () =>
    ingredients.map((item) => item.price).reduce((a, b) => a + b, 0) +
    ingredients[0].price;

  const totalSum = getTotalSum();

  useEffect(() => {
    totalDispatch({
      type: "reset",
    });
    totalDispatch({
      type: "addTotal",
      payload: totalSum,
    });
  }, [ingredients, totalSum]);

  const onClose = () => {
    setModalActive(false);
  };

  const data = ingredients.map((item) => item._id);

  const handleOrderClick = () => {
    fetchPost(_ORDER_URL, { ingredients: data })
      .then((data) => {
        setOrderData({
          number: data.order.number,
          name: data.name,
        });
        setModalActive(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${styles.total_block} mt-10`}>
      <p className="text text_type_digits-medium pr-2">{total.total}</p>
      <CurrencyIcon type={"primary"} />
      <Button
        htmlType={"submit"}
        type="primary"
        size="large"
        onClick={handleOrderClick}
      >
        Оформить заказ
      </Button>
      {modalActive && (
        <Modal onClose={onClose} isOpened={modalActive}>
          <OrderDetails name={orderData.name} number={orderData.number} />
        </Modal>
      )}
    </div>
  );
};

export default ConstructorTotal;
