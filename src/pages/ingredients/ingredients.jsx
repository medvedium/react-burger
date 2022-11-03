import React from "react";
import styles from "../../components/ingredient-details/ingredient-details.module.css";
import IngredientDetailsProperties from "../../components/ingredient-details-properties/ingredient-details-properties";

const IngredientsPage = (item) => {
  return (
    <div className={styles.ingredient}>
      <img src={item.image_large} alt={item.name} className="mb-4" />
      <p className="text text_type_main-medium mb-8">{item.name}</p>
      <IngredientDetailsProperties ingredient={item} />
    </div>
  );
};

export default IngredientsPage;
