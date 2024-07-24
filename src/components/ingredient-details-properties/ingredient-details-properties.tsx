import React from "react";
import styles from "./ingredient-details-properties.module.css";
import IngredientDetailsPropertiesItem from "../ingredient-details-properties-item/ingredient-details-properties-item";
import { IIngredient } from "../../models/models";

interface IngredientDetailsPropertiesProps {
  ingredient: IIngredient;
}

const IngredientDetailsProperties = ({
  ingredient,
}: IngredientDetailsPropertiesProps) => {
  const { calories, proteins, fat, carbohydrates } = ingredient;
  return (
    <div className={`${styles.properties} mb-5`}>
      <IngredientDetailsPropertiesItem title="Калории,ккал" value={calories} />
      <IngredientDetailsPropertiesItem title="Белки, г" value={proteins} />
      <IngredientDetailsPropertiesItem title="Жиры, г" value={fat} />
      <IngredientDetailsPropertiesItem
        title="Углеводы, г"
        value={carbohydrates}
      />
    </div>
  );
};

export default IngredientDetailsProperties;
