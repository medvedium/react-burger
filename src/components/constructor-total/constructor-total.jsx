import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrderData } from "../../services/actions/burger-constructor";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";

const ConstructorTotal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth } = useSelector((state) => state.rootReducer.userData);

  const { selectedIngredients, selectedBun, total } = useAppSelector(
    (state) => state.ingredients
  );
  const { resetConstructor } = useActions();

  const addedIds = useMemo(() => {
    return (
      selectedIngredients &&
      selectedBun && [
        ...selectedIngredients.map((item) => item._id),
        selectedBun._id,
      ]
    );
  }, [selectedIngredients, selectedBun]);

  const handleOrder = () => {
    if (isAuth) {
      if (selectedBun._id && selectedIngredients.length) {
        resetConstructor();
        dispatch(postOrderData(addedIds));
      }
    } else {
      history.replace("/login");
    }
  };

  return (
    <div className={`${styles.total_block} mt-10`}>
      <p className="text text_type_digits-medium pr-2">{total || 0}</p>
      <CurrencyIcon type={"primary"} />
      <Button
        htmlType={"submit"}
        type="primary"
        size="large"
        onClick={() => handleOrder()}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
export default ConstructorTotal;
