import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-item.module.css";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient, ILocationState } from "../../models/models";
import { Identifier } from "dnd-core";

interface BurgerIngredientsItemProps {
  item: IIngredient;
}

const BurgerIngredientsItem = ({ item }: BurgerIngredientsItemProps) => {
  const location = useLocation<ILocationState>();

  const ingredientId = item["_id"];

  const [{ isDrag }, dragRef] = useDrag<
    IIngredient,
    void,
    { isDrag: Identifier | null }
  >({
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
        data-testid={`ingredient-cart-${ingredientId}`}
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
          {!!item.count && <Counter count={item.count} size="default" />}
        </div>
      </Link>
    );
  } else {
    return <></>;
  }
};

export default BurgerIngredientsItem;
