import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useEffect, useReducer, useState } from "react";
import { reducer } from "../../utils/total-reducer.js";
import { _ORDER_URL } from "../../utils/constants";
import { fetchPost } from "../../utils/api";
import { useSelector } from "react-redux";

const ConstructorTotal = () => {
  // const ingredients = useContext(ConstructorIngredientsContext);
  const initialTotalValue = { total: 0 };
  const [modalActive, setModalActive] = useState(false);
  const [orderData, setOrderData] = useState({});
  // const [total, totalDispatch] = useReducer(
  //   reducer,
  //   initialTotalValue,
  //   undefined
  // );

  const { selectedIngredients, selectedBun } = useSelector(
    (state) => state.ingredientsList
  );

  const getTotalSum = () => {
    if (selectedIngredients.length) {
      return (
        selectedIngredients
          .map((item) => item.price)
          .reduce((a, b) => a + b, 0) +
        selectedBun.price * 2
      );
    }
    return 0;
  };
  let total;

  useEffect(() => {
    total = getTotalSum();
  }, [selectedIngredients]);

  const totalSum = getTotalSum();

  // useEffect(() => {
  //   totalDispatch({
  //     type: "reset",
  //   });
  //   totalDispatch({
  //     type: "addTotal",
  //     payload: totalSum,
  //   });
  // }, [selectedIngredients, totalSum]);

  const onClose = () => {
    setModalActive(false);
  };

  const data =
    selectedIngredients && selectedIngredients.map((item) => item._id);

  const handleOrderClick = () => {
    fetchPost(_ORDER_URL, { main: data })
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
      <p className="text text_type_digits-medium pr-2">{total}</p>
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
