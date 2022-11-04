import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrderData } from "../../services/actions/burger-constructor";
import { getCookie } from "../../utils/api";
import { checkUser } from "../../services/actions/auth";
import { useHistory } from "react-router-dom";

const ConstructorTotal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = document.cookie ? getCookie("token") : "";
  const { isAuth } = useSelector((state) => state.userData);

  const { selectedIngredients, selectedBun, total } = useSelector(
    (state) => state.ingredientsList
  );

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
    dispatch(checkUser(token));
    if (isAuth) {
      if (selectedBun._id && selectedIngredients.length) {
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
