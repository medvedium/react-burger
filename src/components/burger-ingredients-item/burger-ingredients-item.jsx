import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-item.module.css";
import PropTypes from "prop-types";
import { _BUN, ingredientItem } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  OPEN_INGREDIENT_MODAL,
  SELECT_INGREDIENT,
} from "../../services/actions/ingredient";
import { useDrag } from "react-dnd";
import { useEffect, useMemo } from "react";

const BurgerIngredientsItem = ({ item }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({ type: SELECT_INGREDIENT, item: item });
    dispatch({ type: OPEN_INGREDIENT_MODAL });
  };

  const { selectedIngredients } = useSelector((state) => state);

  const addIngredient = () => {
    dispatch({ type: ADD_INGREDIENT, item: item });
  };

  const addBun = () => {
    dispatch({ type: ADD_BUN, item: item });
  };

  // const [{ isDrag }, dragRef] = useDrag({
  //   type: "ingredient",
  //   item: item._id,
  //   collect: (monitor) => ({
  //     isDrag: monitor.isDragging(),
  //   }),
  // });

  return (
    <>
      <div
        className={styles.card}
        onClick={item.type === _BUN ? addBun : addIngredient}
        // onClick={openModal}
      >
        <img src={item.image} alt={item.name} />
        <div className={`${styles.price} pt-1 pt-2`}>
          <p className="text text_type_digits-default mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {item.name}
        </p>
        {item.count && <Counter count={item.count} size="default" />}
      </div>
    </>
  );
};

BurgerIngredientsItem.propTypes = {
  count: PropTypes.number,
  item: ingredientItem.isRequired,
};

export default BurgerIngredientsItem;
