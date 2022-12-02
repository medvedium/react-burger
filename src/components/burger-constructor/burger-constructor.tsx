import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorTotal from "../constructor-total/constructor-total";
import no_image from "../../images/no-image.png";
import { useDrop } from "react-dnd";
import BurgerConstructorItem from "../burer-constructor-item/burger-constructor-item";
import { useCallback } from "react";
import { useAppSelector } from "../../hooks/redux";
import { _BUN } from "../../utils/constants";
import { nanoid } from "nanoid";
import { useActions } from "../../hooks/actions";
import { IIngredient } from "../../models/models";
import { RootState } from "../../store";

const BurgerConstructor = () => {
  const { selectedBun, selectedIngredients, isRequest, isRequestError } =
    useAppSelector((state: RootState) => state.ingredients);

  const { addBun, getTotalPrice, addIngredient, updateSelectedIngredients } =
    useActions();

  const [{ isHover }, ingredientDropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      const newItem = { ...item };
      if (item.type === _BUN) {
        addBun(item);
        getTotalPrice();
      } else {
        newItem.uid = nanoid(8);
        addIngredient(newItem);
        getTotalPrice();
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = selectedIngredients[dragIndex];
      const newCards = [...selectedIngredients];

      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      updateSelectedIngredients(newCards);
    },
    [selectedIngredients, updateSelectedIngredients]
  );

  const renderItems = useCallback(
    (item: IIngredient, index: number) => {
      return (
        <BurgerConstructorItem
          item={item}
          index={index}
          key={item.uid}
          moveCard={moveCard}
        />
      );
    },
    [moveCard]
  );

  if (isRequestError) {
    return <p>Error</p>;
  } else if (isRequest) {
    return <p>Loading...</p>;
  } else if (selectedIngredients) {
    return (
      <section
        className={`${styles.section} ${isHover ? styles.hovered : ""}`}
        ref={ingredientDropTarget}
      >
        <div className={"pl-8"}>
          <ConstructorElement
            extraClass={styles.constructor_element}
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
            selectedIngredients.map((item: IIngredient, index: number) =>
              renderItems(item, index)
            )}
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
  } else {
    return <></>;
  }
};

export default BurgerConstructor;
