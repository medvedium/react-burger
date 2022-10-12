import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useContext, useEffect, useReducer, useState } from "react";
import { ConstructorIngredientsContext } from "../../utils/constructor-ingredients-context";
import { reducer } from "../../utils/total-reducer.js";
import { OrderContext } from "../../utils/order-context";

const ConstructorTotal = () => {
  const ingredients = useContext(ConstructorIngredientsContext);
  const initialTotalValue = { total: 0 };
  const [modalActive, setModalActive] = useState(false);
  const [orderData, setOrderData] = useState(useContext(OrderContext));
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
    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrderData({
            number: data.order.number,
            name: data.name,
          });
          setModalActive(true);
        }
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
          <OrderContext.Provider value={orderData}>
            <OrderDetails />
          </OrderContext.Provider>
        </Modal>
      )}
    </div>
  );
};

export default ConstructorTotal;
