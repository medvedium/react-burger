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
import PropTypes from "prop-types";
import { ingredientItem } from "../../utils/constants";

function BurgerConstructorItem({ item, index, moveCard }) {
  const dispatch = useDispatch();

  const handleIngredientRemove = (item) => {
    dispatch({ type: REMOVE_INGREDIENT, item: item });
    dispatch({ type: GET_TOTAL_PRICE });
  };

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
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
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

  return (
    <div
      className={`${styles.item} ${isDragging && styles.dragging}`}
      ref={ref}
      data-handler-id={handlerId}
      onDrop={preventDefault}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleIngredientRemove(item)}
      />
    </div>
  );
}

BurgerConstructorItem.propTypes = {
  item: ingredientItem.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
};

export default BurgerConstructorItem;
