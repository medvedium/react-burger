import React from "react";
import styles from "./ingredient-details.module.css";
import IngredientDetailsProperties from "../ingredient-details-properties/ingredient-details-properties";
import PropTypes from "prop-types";
import { ingredientItem } from "../../utils/constants";

const IngredientDetails = ({ item }) => {
  return (
    <div className={styles.ingredient}>
      <img src={item.image_large} alt={item.name} className="mb-4" />
      <p className="text text_type_main-medium mb-8">{item.name}</p>
      <IngredientDetailsProperties ingredient={item} />
    </div>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(ingredientItem),
};

export default IngredientDetails;
