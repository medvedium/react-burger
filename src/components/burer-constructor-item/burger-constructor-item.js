import React, { useRef } from "react";
import styles from "./burger-constructor-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import {
  GET_TOTAL_PRICE,
  REMOVE_INGREDIENT,
} from "../../services/actions/ingredient";
import { useDispatch } from "react-redux";

const BurgerConstructorItem = ({
  ingredient,
  idx,
  moveConstructorIngredient,
}) => {
  const dispatch = useDispatch();

  const handleIngredientRemove = (ingredient) => {
    dispatch({ type: REMOVE_INGREDIENT, item: ingredient });
    dispatch({ type: GET_TOTAL_PRICE });
  };

  const ref = useRef(null);

  const [{ isDrag }, dragRef] = useDrag(() => ({
    type: "constructorElement",
    collect: (monitor) => ({
      isDrag: !!monitor.isDragging(),
    }),
    item: { ingredient },
  }));

  const [{ handlerId }, drop] = useDrop(() => ({
    accept: "constructorElement",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.idx;
      const hoverIndex = idx;

      console.log(dragIndex);

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveConstructorIngredient(dragIndex, hoverIndex);
      item.idx = hoverIndex;
    },
  }));

  dragRef(drop(ref));

  return (
    <div
      className={`${styles.item} ${isDrag && styles.dragging}`}
      ref={ref}
      data-handler-id={handlerId}
      onDrop={(e) => e.preventDefault()}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleIngredientRemove(ingredient)}
      />
    </div>
  );
};

export default BurgerConstructorItem;
