import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-item.module.css";
import PropTypes from "prop-types";
import { ingredientItem } from "../../utils/constants";
import { useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerConstructorItem = ({ item }) => {
  const [modalActive, setModalActive] = useState(false);

  const onClose = () => {
    setModalActive(false);
  };

  return (
    <>
      <div className={styles.card} onClick={() => setModalActive(true)}>
        <img src={item.image} alt={item.name} />
        <div className={`${styles.price} pt-1 pt-2`}>
          <p className="text text_type_digits-default mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {item.name}
        </p>
        <Counter count={1} size="default" />
      </div>
      {modalActive && (
        <Modal
          onClose={onClose}
          isOpened={modalActive}
          header={"Детали ингредиента"}
        >
          <IngredientDetails item={item} />
        </Modal>
      )}
    </>
  );
};

BurgerConstructorItem.propTypes = {
  data: PropTypes.arrayOf(ingredientItem),
};

export default BurgerConstructorItem;
