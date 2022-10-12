import BurgerIngredientsTabs from "../burger-ingredients-tabs/burger-ingredients-tabs";
import BurgerIngredientsList from "../burger-ingredients-list/burger-ingredients-list";
// import PropTypes from "prop-types";
// import { ingredientItem } from "../../utils/constants";

const BurgerIngredients = () => {
  return (
    <section>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <BurgerIngredientsTabs />
      <BurgerIngredientsList />
    </section>
  );
};

BurgerIngredients.propTypes = {
  // data: PropTypes.arrayOf(ingredientItem),
};

export default BurgerIngredients;
