import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrderData } from "../../services/reducers/burger-constructor";
import { fetchPost } from "../../utils/api";
import { _ORDER_URL } from "../../utils/constants";

const ConstructorTotal = (factory, deps) => {
  const dispatch = useDispatch();

  const { selectedIngredients, selectedBun, total } = useSelector(
    (state) => state.ingredientsList
  );

  const data = useMemo(() => {
    return (
      selectedIngredients &&
      selectedBun && [
        ...selectedIngredients.map((item) => item._id),
        selectedBun._id,
      ]
    );
  }, [selectedIngredients, selectedBun]);

  return (
    <div className={`${styles.total_block} mt-10`}>
      <p className="text text_type_digits-medium pr-2">{total}</p>
      <CurrencyIcon type={"primary"} />
      <Button
        htmlType={"submit"}
        type="primary"
        size="large"
        onClick={() => dispatch(postOrderData(data))}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
export default ConstructorTotal;
