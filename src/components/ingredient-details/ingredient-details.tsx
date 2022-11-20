import React from "react";
import styles from "./ingredient-details.module.css";
import IngredientDetailsProperties from "../ingredient-details-properties/ingredient-details-properties";
import { IIngredient } from "../../models/models";

interface IngredientDetailsProps {
  item: IIngredient;
}

const IngredientDetails = ({ item }: IngredientDetailsProps) => {
  return (
    <div className={styles.ingredient}>
      <img src={item.image_large} alt={item.name} className="mb-4" />
      <p className="text text_type_main-medium mb-8">{item.name}</p>
      <IngredientDetailsProperties ingredient={item} />
    </div>
  );
};

export default IngredientDetails;
