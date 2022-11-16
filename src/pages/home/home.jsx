import React from "react";
import styles from "./home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/actions";

const HomePage = () => {
  const { orderName, orderNumber } = useAppSelector(
    (store) => store.burgerConstructor
  );

  const modalIsOpen = useAppSelector(store => store.modal)

  const {closeModal} = useActions()

  const onCloseOrderModal = () => {
    closeModal()
  };
  return (
    <>
      <div className={styles.home_container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>

      {modalIsOpen && (
        <Modal onClose={onCloseOrderModal} isOpened={modalIsOpen}>
          <OrderDetails name={orderName} number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
