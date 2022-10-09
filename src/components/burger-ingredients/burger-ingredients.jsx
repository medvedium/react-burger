import styles from "./burger-ingredients.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorTotal from "../constructor-total/constructor-total";
import { _BUN, ingredientItem } from "../../utils/constants";
import { useMemo } from "react";
import PropTypes from "prop-types";

const BurgerIngredients = ({ data }) => {
  const total = useMemo(
    () => data.map((item) => item.price).reduce((a, b) => a + b, 0),
    [data]
  );

  return (
    <section className={styles.section}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className={"pl-8"}>
          <ConstructorElement
            key={0}
            type="top"
            isLocked={true}
            text={data && data.length && data[0].name}
            price={data && data.length && data[0].price}
            thumbnail={data && data.length && data[0].image}
          />
        </div>
        <div className={styles.ingredients_list}>
          {data &&
            data.length &&
            data.map((ingredient) => {
              return ingredient.type !== _BUN ? (
                <div key={ingredient._id} className={styles.item}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </div>
              ) : null;
            })}
        </div>
        <div className={"pl-8"}>
          <ConstructorElement
            key={1}
            type="bottom"
            isLocked={true}
            text={data && data.length && data[data.length - 1].name}
            price={data && data.length && data[data.length - 1].price}
            thumbnail={data && data.length && data[data.length - 1].image}
          />
        </div>
      </div>
      <ConstructorTotal value={total} />
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientItem),
};

export default BurgerIngredients;
