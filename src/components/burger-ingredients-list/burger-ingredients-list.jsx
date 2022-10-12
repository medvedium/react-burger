import styles from "./burger-constructor-list.module.css";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import PropTypes from "prop-types";
import { ingredientItem, _BUN, _SAUCE, _MAIN } from "../../utils/constants";
import { useContext } from "react";
import { IngredientsContext } from "../../utils/ingredients-context";
import { ConstructorIngredientsContext } from "../../utils/constructor-ingredients-context";

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
              key={index}
              count={addedIds.indexOf(item._id) >= 0 ? 1 : null}
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
              key={index}
              count={addedIds.indexOf(item._id) >= 0 ? 1 : null}
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
              key={index}
              count={addedIds.indexOf(item._id) >= 0 ? 1 : null}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

BurgerIngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientItem),
};

export default BurgerIngredientsList;
