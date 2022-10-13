import styles from "./burger-ingredients-list.module.css";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { _BUN, _SAUCE, _MAIN } from "../../utils/constants";
import { useContext } from "react";
import { ConstructorIngredientsContext } from "../../utils/contexts/constructor-ingredients-context";
import { IngredientsContext } from "../../utils/contexts/ingredients-context";

const BurgerIngredientsList = () => {
  const ingredients = useContext(IngredientsContext);
  const sorted = useContext(ConstructorIngredientsContext);

  const addedIds = sorted.map((item) => item._id);

  return (
    <div className={`${styles.list} custom-scroll`}>
      <p className="text text_type_main-medium">Булки</p>
      <div className={styles.section}>
        {ingredients.map((item, index) =>
          item.type === _BUN ? (
            <BurgerIngredientsItem
              item={item}
              key={item._id}
              count={addedIds.indexOf(item._id) >= 0 ? 1 : 0}
            />
          ) : null
        )}
      </div>
      <p className="text text_type_main-medium">Соусы</p>
      <div className={styles.section}>
        {ingredients.map((item, index) =>
          item.type === _SAUCE ? (
            <BurgerIngredientsItem
              item={item}
              key={item._id}
              count={addedIds.indexOf(item._id) >= 0 ? 1 : 0}
            />
          ) : null
        )}
      </div>
      <p className="text text_type_main-medium">Начинки</p>
      <div className={styles.section}>
        {ingredients.map((item, index) =>
          item.type === _MAIN ? (
            <BurgerIngredientsItem
              item={item}
              key={item._id}
              count={addedIds.indexOf(item._id) >= 0 ? 1 : 0}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default BurgerIngredientsList;
