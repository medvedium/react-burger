import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorTotal from "../constructor-total/constructor-total";
import { useDispatch, useSelector } from "react-redux";
import no_image from "../../images/no-image.png";
import { REMOVE_INGREDIENT } from "../../services/actions/ingredient";

const BurgerConstructor = () => {
  const { selectedBun, selectedIngredients, isRequest, isRequestError } =
    useSelector((state) => state.ingredientsList);

  const dispatch = useDispatch();

  const handleIngredientRemove = (ingredient) => {
    dispatch({ type: REMOVE_INGREDIENT, item: ingredient });
  };

  if (isRequestError) {
    return "Error";
  } else if (isRequest) {
    return "Loading...";
  } else if (selectedIngredients) {
    return (
      <section className={styles.section}>
        <div className={"pl-8"}>
          <ConstructorElement
            className={styles.constructor_element}
            type="top"
            isLocked={true}
            text={
              selectedBun.name ? selectedBun.name + " (верх)" : "Выберите булку"
            }
            price={selectedBun.price ? selectedBun.price : 0}
            thumbnail={selectedBun.image ? selectedBun.image : no_image}
          />
        </div>
        <div className={`${styles.ingredients_list} custom-scroll mt-4 mb-4`}>
          {selectedIngredients &&
            selectedIngredients.map((ingredient) => {
              return (
                <div key={ingredient._id} className={styles.item}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => handleIngredientRemove(ingredient)}
                  />
                </div>
              );
            })}
        </div>
        <div className={"pl-8"}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={
              selectedBun.name ? selectedBun.name + " (низ)" : "Выберите булку"
            }
            price={selectedBun.price ? selectedBun.price : 0}
            thumbnail={selectedBun.image ? selectedBun.image : no_image}
          />
        </div>
        <ConstructorTotal />
      </section>
    );
  }
};

export default BurgerConstructor;
