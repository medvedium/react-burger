import React, { useEffect, useState } from "react";
import styles from "../../components/ingredient-details/ingredient-details.module.css";
import IngredientDetailsProperties from "../../components/ingredient-details-properties/ingredient-details-properties";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { IIngredient, ILocationState } from "../../models/models";
import { RootState } from "../../store";
import { emptyIngredient } from "../../store/ingredients.slice";

const IngredientsPage = () => {
  const { items } = useAppSelector((store: RootState) => store.ingredients);
  const { ingredientId } = useParams<{ ingredientId?: string }>();
  const [item, setItem] = useState<IIngredient>(emptyIngredient);
  const location = useLocation<ILocationState>();
  const background = location.state && location.state.background;
  useEffect(() => {
    const neededItem: IIngredient = {
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
