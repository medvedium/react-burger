import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-item.module.css";
import PropTypes from "prop-types";
import { ingredientItem } from "../../utils/constants";
import { useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredientsItem = ({ item, count }) => {
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
        {count ? <Counter count={count} size="default" /> : null}
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

BurgerIngredientsItem.propTypes = {
  count: PropTypes.number,
  item: ingredientItem.isRequired,
};

export default BurgerIngredientsItem;
