import React from "react";
import styles from "./ingredient-details-properties-item.module.css";

interface IngredientDetailsPropertiesItemProps {
  title: string;
  value?: number;
}

const IngredientDetailsPropertiesItem = ({
  title,
  value,
}: IngredientDetailsPropertiesItemProps) => {
  return (
    <div className={styles.properties_item}>
      <div className={styles.properties_title}>
        <p className="text text_type_main-default text_color_inactive mb-2">
          {title}
        </p>
      </div>
      <div className={styles.properties_value}>
        <p className="text text_type_digits-default text_color_inactive">
          {"Н/у" && value}
        </p>
      </div>
    </div>
  );
};

export default IngredientDetailsPropertiesItem;
