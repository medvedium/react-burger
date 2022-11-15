import React from "react";
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_ORDER_MODAL } from "../../services/actions/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isOrderModalOpen, orderName, orderNumber } = useSelector(
    (store) => store.rootReducer.burgerConstructor
  );

  const onCloseOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };
  return (
    <>
      <div className={styles.home_container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>

      {isOrderModalOpen && (
        <Modal onClose={onCloseOrderModal} isOpened={isOrderModalOpen}>
          <OrderDetails name={orderName} number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
