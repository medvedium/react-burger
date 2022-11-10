import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorTotal from "../constructor-total/constructor-total";
import { useDispatch, useSelector } from "react-redux";
import no_image from "../../images/no-image.png";
import {
  addIngredient,
  UPDATE_SELECTED_INGREDIENTS_LIST,
} from "../../services/actions/ingredient";
import { useDrop } from "react-dnd";
import BurgerConstructorItem from "../burer-constructor-item/burger-constructor-item";
import { useCallback } from "react";
import { useAppSelector } from "../../hooks/redux";

const BurgerConstructor = () => {
  const { selectedBun, selectedIngredients, isRequest, isRequestError } =
    useAppSelector((state) => state.ingredients);

  const dispatch = useDispatch();

  const [{ isHover }, ingredientDropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      addIngredient(dispatch, item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = selectedIngredients[dragIndex];
      const newCards = [...selectedIngredients];

      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: UPDATE_SELECTED_INGREDIENTS_LIST,
        payload: newCards,
      });
    },
    [selectedIngredients, dispatch]
  );

  if (isRequestError) {
    return "Error";
  } else if (isRequest) {
    return "Loading...";
  } else if (selectedIngredients) {
    return (
      <section
        className={`${styles.section} ${isHover ? styles.hovered : ""}`}
        ref={ingredientDropTarget}
      >
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
        <div className={`${styles.ingredients_list}  custom-scroll mt-4 mb-4`}>
          {selectedIngredients &&
            selectedIngredients.map((item, index) => {
              return (
                <BurgerConstructorItem
                  item={item}
                  index={index}
                  key={item.uid}
                  moveCard={moveCard}
                />
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
