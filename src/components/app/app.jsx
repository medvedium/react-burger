import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import ErrorBoundary from "../error-boundary/error-boundary";
import { useCallback, useContext, useEffect, useState } from "react";
import { _URL, sortIngredients } from "../../utils/constants";
import { fetchRequest } from "../../utils/fetch-request";
import { IngredientsContext } from "../../utils/ingredients-context";
import { ConstructorIngredientsContext } from "../../utils/constructor-ingredients-context";

function App() {
  const [data, setData] = useState(useContext(IngredientsContext));
  const [sorted, setSorted] = useState(
    useContext(ConstructorIngredientsContext)
  );

  const sortData = useCallback(() => sortIngredients(data), [data]);

  useEffect(() => {
    fetchRequest(_URL, setData);
  }, []);

  useEffect(() => {
    setSorted(sortData);
  }, [setSorted, sortData]);

  return (
    <main className={styles.main}>
      <ErrorBoundary>
        <AppHeader />
        <div className={styles.app_container}>
          <ConstructorIngredientsContext.Provider value={sorted}>
            <IngredientsContext.Provider value={data}>
              <BurgerIngredients />
            </IngredientsContext.Provider>

            <BurgerConstructor />
          </ConstructorIngredientsContext.Provider>
        </div>
      </ErrorBoundary>
    </main>
  );
}

export default App;
