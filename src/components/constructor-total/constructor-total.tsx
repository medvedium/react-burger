import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";
import { usePostOrderDataMutation } from "../../store/api";
import Loader from "../loader/loader";

const ConstructorTotal = () => {
  const [makeOrder, { isLoading, isError, error }] = usePostOrderDataMutation();

  const history = useHistory();
  const { isAuth } = useAppSelector((state) => state.auth);

  const { selectedIngredients, selectedBun, total } = useAppSelector(
    (state) => state.ingredients
  );
  const { resetConstructor, getOrderData, openOrderModal } = useActions();

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
        makeOrder(addedIds)
          .unwrap()
          .then((res) => {
            getOrderData(res);
            openOrderModal();
          });
      }
    } else if (!isAuth) {
      history.replace("/login");
    }
  };

  if (isLoading) return <Loader />;
  else if (isError) return <p>Ошибка {error.originalStatus}</p>;
  else
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
