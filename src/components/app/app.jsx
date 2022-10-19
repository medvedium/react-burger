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
import { CLOSE_INGREDIENT_MODAL } from "../../services/actions/ingredient";
import OrderDetails from "../order-details/order-details";

function App() {
  const dispatch = useDispatch();
  const { isIngredientModalOpen, selectedIngredient } = useSelector(
    (state) => state.ingredientsList
  );
  const { isOrderModalOpen, orderName, orderNumber } = useSelector(
    (state) => state.burgerConstructor
  );
  const onClose = () => {
    dispatch({ type: CLOSE_INGREDIENT_MODAL });
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

      {isIngredientModalOpen && (
        <Modal
          onClose={onClose}
          isOpened={isIngredientModalOpen}
          header={"Детали ингредиента"}
        >
          <IngredientDetails item={selectedIngredient} />
        </Modal>
      )}

      {isOrderModalOpen && (
        <Modal onClose={onClose} isOpened={isOrderModalOpen}>
          <OrderDetails name={orderName} number={orderNumber} />
        </Modal>
      )}
    </ErrorBoundary>
  );
}

export default App;
