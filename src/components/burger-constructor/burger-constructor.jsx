import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorTotal from "../constructor-total/constructor-total";
import { _BUN, ingredientItem } from "../../utils/constants";
import { useContext } from "react";
import PropTypes from "prop-types";
import { ConstructorIngredientsContext } from "../../utils/constructor-ingredients-context";

// bun1 - arr[0]
// splice(arr[0], arr[arr.length - 2])
// bun2 - arr[0]

const BurgerConstructor = () => {
  const ingredients = useContext(ConstructorIngredientsContext);

  return (
    <>
      {ingredients.length && (
        <section className={styles.section}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div className={"pl-8"}>
              <ConstructorElement
                key={ingredients[0]._id}
                type="top"
                isLocked={true}
                text={ingredients[0].name + " (верх)"}
                price={ingredients[0].price}
                thumbnail={ingredients[0].image}
              />
            </div>
            <div className={`${styles.ingredients_list} custom-scroll`}>
              {ingredients.map((ingredient) => {
                return ingredient.type !== _BUN ? (
                  <div key={ingredient._id} className={styles.item}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                      handleClose={() => console.log("remove")}
                    />
                  </div>
                ) : null;
              })}
            </div>
            <div className={"pl-8"}>
              <ConstructorElement
                key={ingredients[0]._id}
                type="bottom"
                isLocked={true}
                text={ingredients[0].name + " (низ)"}
                price={ingredients[0].price}
                thumbnail={ingredients[0].image}
                ZZZZ
              />
            </div>
          </div>
          <ConstructorTotal />
        </section>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientItem),
};

export default BurgerConstructor;
