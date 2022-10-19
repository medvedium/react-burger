import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrderData } from "../../services/reducers/burger-constructor";

const ConstructorTotal = () => {
  const dispatch = useDispatch();

  const { selectedIngredients, selectedBun } = useSelector(
    (state) => state.ingredientsList
  );

  const total = useMemo(() => {
    selectedIngredients.reduce((a, b) => a + b, selectedBun.price * 2 || 0);
  }, [selectedIngredients, selectedBun]);

  const data = selectedIngredients &&
    (selectedBun || null) && [
      ...selectedIngredients.map((item) => item._id),
      selectedBun._id,
    ];

  return (
    <div className={`${styles.total_block} mt-10`}>
      <p className="text text_type_digits-medium pr-2">123</p>
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
