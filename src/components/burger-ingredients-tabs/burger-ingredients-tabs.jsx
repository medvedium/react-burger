import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-tabs.module.css";
import { _BUN, _SAUCE, _MAIN } from "../../utils/constants";

const BurgerIngredientsTabs = () => {
  const [current, setCurrent] = React.useState(_BUN);
  return (
    <div className={`${styles.tabs_list} mb-10`}>
      <Tab value={_BUN} active={current === _BUN} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value={_SAUCE} active={current === _SAUCE} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value={_MAIN} active={current === _MAIN} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

export default BurgerIngredientsTabs;
