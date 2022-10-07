import styles from "./burger-constructor-list.module.css";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import PropTypes from "prop-types";
import { ingredientItem, _BUN, _SAUCE, _MAIN } from "../../utils/constants";

const BurgerConstructorList = ({ ingredients }) => {
  return (
    <div className={styles.list}>
      <p className="text text_type_main-medium">Булки</p>
      <div className={styles.section}>
        {ingredients.map((item, index) =>
          item.type === _BUN ? (
            <BurgerConstructorItem item={item} key={index} />
          ) : null
        )}
      </div>
      <p className="text text_type_main-medium">Соусы</p>
      <div className={styles.section}>
        {ingredients.map((item, index) =>
          item.type === _SAUCE ? (
            <BurgerConstructorItem item={item} key={index} />
          ) : null
        )}
      </div>
      <p className="text text_type_main-medium">Начинки</p>
      <div className={styles.section}>
        {ingredients.map((item, index) =>
          item.type === _MAIN ? (
            <BurgerConstructorItem item={item} key={index} />
          ) : null
        )}
      </div>
    </div>
  );
};

BurgerConstructorList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientItem),
};

export default BurgerConstructorList;
