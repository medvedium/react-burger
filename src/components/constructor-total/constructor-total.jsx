import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useContext, useEffect, useReducer, useState } from "react";
import { ConstructorIngredientsContext } from "../../utils/constructor-ingredients-context";
import { reducer } from "../../utils/total-reducer.js";

const ConstructorTotal = () => {
  const ingredients = useContext(ConstructorIngredientsContext);
  const initialTotalValue = { total: 0 };
  const [modalActive, setModalActive] = useState(false);
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

  return (
    <div className={`${styles.total_block} mt-10`}>
      <p className="text text_type_digits-medium pr-2">{total.total}</p>
      <CurrencyIcon type={"primary"} />
      <Button
        htmlType={"submit"}
        type="primary"
        size="large"
        onClick={() => {
          setModalActive(true);
        }}
      >
        Оформить заказ
      </Button>
      {modalActive && (
        <Modal onClose={onClose} isOpened={modalActive}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default ConstructorTotal;
