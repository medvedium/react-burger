import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-tabs.module.css";
import { _BUN, _SAUCE, _MAIN } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { CHOOSE_TAB } from "../../services/actions/ingredient";

const BurgerIngredientsTabs = () => {
  const { activeTab } = useSelector((state) => state.ingredientsList);
  const dispatch = useDispatch();
  const handleTabToggle = (e) => {
    dispatch({ type: CHOOSE_TAB, value: e });
  };
  return (
    <div className={`${styles.tabs_list} mb-10`}>
      <Tab
        value={_BUN}
        active={activeTab === _BUN}
        onClick={(e) => handleTabToggle(e)}
      >
        Булки
      </Tab>
      <Tab
        value={_SAUCE}
        active={activeTab === _SAUCE}
        onClick={(e) => handleTabToggle(e)}
      >
        Соусы
      </Tab>
      <Tab
        value={_MAIN}
        active={activeTab === _MAIN}
        onClick={(e) => handleTabToggle(e)}
      >
        Начинки
      </Tab>
    </div>
  );
};

export default BurgerIngredientsTabs;
