import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import ErrorBoundary from "../error-boundary/error-boundary";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { CLOSE_INGREDIENT_MODAL } from "../../services/actions/ingredient";
import { CLOSE_ORDER_MODAL } from "../../services/actions/burger-constructor";

function App() {
  const dispatch = useDispatch();
  const { isIngredientModalOpen, selectedIngredient } = useSelector(
    (state) => state.ingredientsList
  );
  const { isOrderModalOpen, orderName, orderNumber } = useSelector(
    (state) => state.burgerConstructor
  );
  const onCloseIngredientModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_MODAL });
  };

  const onCloseOrderModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };

  return (
    <ErrorBoundary>
      <AppHeader />
      <main className={styles.app_container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>

      {isOrderModalOpen && (
        <Modal onClose={onCloseOrderModal} isOpened={isOrderModalOpen}>
          <OrderDetails name={orderName} number={orderNumber} />
        </Modal>
      )}

      {isIngredientModalOpen && (
        <Modal
          onClose={onCloseIngredientModal}
          isOpened={isIngredientModalOpen}
          header={"Детали ингредиента"}
        >
          <IngredientDetails item={selectedIngredient} />
        </Modal>
      )}
    </ErrorBoundary>
  );
}

export default App;
