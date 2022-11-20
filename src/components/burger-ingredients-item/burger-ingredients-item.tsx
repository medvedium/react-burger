import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-item.module.css";
import { ingredientItem } from "../../utils/constants";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient, ILocationState } from "../../models/models";

interface BurgerIngredientsItemProps {
  item: IIngredient;
}

const BurgerIngredientsItem = ({ item }: BurgerIngredientsItemProps) => {
  const location = useLocation<ILocationState>();

  const ingredientId = item["_id"];

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  if (!isDrag) {
    return (
      <Link
        to={{
          pathname: `/ingredients/${ingredientId}`,
          state: { background: location },
        }}
        key={ingredientId}
      >
        <div className={styles.card} ref={dragRef}>
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
      </Link>
    );
  } else {
    return <></>;
  }
};

BurgerIngredientsItem.propTypes = {
  item: ingredientItem.isRequired,
};

export default BurgerIngredientsItem;
