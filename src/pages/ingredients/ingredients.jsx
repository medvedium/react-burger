import React, { useEffect, useState } from "react";
import styles from "../../components/ingredient-details/ingredient-details.module.css";
import IngredientDetailsProperties from "../../components/ingredient-details-properties/ingredient-details-properties";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const IngredientsPage = () => {
  const { items } = useSelector((store) => store.ingredientsList);
  const { ingredientId } = useParams();
  const [item, setItem] = useState({});
  const location = useLocation();
  const background = location.state && location.state.background;
  useEffect(() => {
    const neededItem = {
      ...items.filter((item) => item._id === ingredientId)[0],
    };
    setItem(neededItem);
  }, [items, ingredientId]);
  return (
    <div className={styles.ingredient}>
      {!background && (
        <p className="text text_type_main-large mb-8 mt-30">
          Детали ингредиента
        </p>
      )}

      <img src={item.image_large} alt={item.name} className="mb-4" />
      <p className="text text_type_main-medium mb-8">{item.name}</p>
      <IngredientDetailsProperties ingredient={item} />
    </div>
  );
};

export default IngredientsPage;
