import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorTotal from "../constructor-total/constructor-total";
import { _BUN } from "../../utils/constants";
import { useContext } from "react";
import { ConstructorIngredientsContext } from "../../utils/contexts/constructor-ingredients-context";

const BurgerConstructor = () => {
  const ingredients = useContext(ConstructorIngredientsContext);

  return (
    <>
      {ingredients.length && (
        <section className={styles.section}>
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
          <div className={`${styles.ingredients_list} custom-scroll mt-4 mb-4`}>
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
            />
          </div>
          <ConstructorTotal />
        </section>
      )}
    </>
  );
};

export default BurgerConstructor;
