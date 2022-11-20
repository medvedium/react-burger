import React from "react";
import styles from "./ingredient-details-properties.module.css";
import IngredientDetailsPropertiesItem from "../ingredient-details-properties-item/ingredient-details-properties-item";
import { ingredientItem } from "../../utils/constants";

const IngredientDetailsProperties = ({ ingredient }) => {
  const { calories, proteins, fat, carbohydrates } = ingredient;
  return (
    <div>
      <div className={`${styles.properties} mb-5`}>
        <IngredientDetailsPropertiesItem
          title="Калории,ккал"
          value={calories}
        />
        <IngredientDetailsPropertiesItem title="Белки, г" value={proteins} />
        <IngredientDetailsPropertiesItem title="Жиры, г" value={fat} />
        <IngredientDetailsPropertiesItem
          title="Углеводы, г"
          value={carbohydrates}
        />
      </div>
    </div>
  );
};

IngredientDetailsProperties.propTypes = {
  ingredient: ingredientItem.isRequired,
};

export default IngredientDetailsProperties;
