import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import ErrorBoundary from "../error-boundary/error-boundary";
import { useCallback, useContext, useEffect, useState } from "react";
import { _DATA_URL, sortIngredients } from "../../utils/constants";
import { ConstructorIngredientsContext } from "../../utils/contexts/constructor-ingredients-context";
import { IngredientsContext } from "../../utils/contexts/ingredients-context";
import { fetchGet } from "../../utils/api";

function App() {
  const [data, setData] = useState(useContext(IngredientsContext));
  const [sorted, setSorted] = useState(
    useContext(ConstructorIngredientsContext)
  );

  const sortData = useCallback(() => sortIngredients(data), [data]);

  useEffect(() => {
    fetchGet(_DATA_URL)
      .then(({ data }) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setSorted(sortData);
  }, [setSorted, sortData]);

  return (
    <ErrorBoundary>
      <AppHeader />
      <main className={styles.app_container}>
        <ConstructorIngredientsContext.Provider value={sorted}>
          <IngredientsContext.Provider value={data}>
            <BurgerIngredients />
          </IngredientsContext.Provider>

          <BurgerConstructor />
        </ConstructorIngredientsContext.Provider>
      </main>
    </ErrorBoundary>
  );
}

export default App;
