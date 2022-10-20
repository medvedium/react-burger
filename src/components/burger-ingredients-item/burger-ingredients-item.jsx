import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-item.module.css";
import PropTypes from "prop-types";
import { ingredientItem } from "../../utils/constants";
import { useDispatch } from "react-redux";
import {
  OPEN_INGREDIENT_MODAL,
  SELECT_INGREDIENT,
} from "../../services/actions/ingredient";
import { useDrag } from "react-dnd";

const BurgerIngredientsItem = ({ item }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({ type: SELECT_INGREDIENT, item: item });
    dispatch({ type: OPEN_INGREDIENT_MODAL });
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  return (
    !isDrag && (
      <>
        <div className={styles.card} onClick={openModal} ref={dragRef}>
          <img src={item.image} alt={item.name} />
          <div className={`${styles.price} pt-1 pt-2`}>
            <p className="text text_type_digits-default mr-2">{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${styles.name} text text_type_main-default`}>
            {item.name}
          </p>
          {item.count > 0 && <Counter count={item.count} size="default" />}
        </div>
      </>
    )
  );
};

BurgerIngredientsItem.propTypes = {
  count: PropTypes.number,
  item: ingredientItem.isRequired,
};

export default BurgerIngredientsItem;
