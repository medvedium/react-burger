import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import ErrorBoundary from "../error-boundary/error-boundary";
import { useEffect, useState } from "react";
import { _URL } from "../../utils/constants";

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch(_URL)
      .then((res) => res.json())
      .then((data) => setState(data.data))
      .catch((err) => console.log(err));
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
