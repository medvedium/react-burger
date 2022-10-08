import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import ErrorBoundary from "../error-boundary/error-boundary";
import { useEffect, useState } from "react";
import { _URL } from "../../utils/constants";
import { fetchRequest } from "../../utils/fetchRequest";

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetchRequest(_URL, setState);
  }, []);

  return (
    <main className={styles.main}>
      <ErrorBoundary>
        <AppHeader />
        <div className={styles.app_container}>
          <BurgerConstructor data={state} />
          <BurgerIngredients data={state} />
        </div>
      </ErrorBoundary>
    </main>
  );
}

export default App;
