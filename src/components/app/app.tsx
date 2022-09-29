import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import '../../utils/data.json';

function App() {
  return (
    <>
      <AppHeader />
        <div>
          <BurgerConstructor/>
          <BurgerIngredients/>
        </div>
    </>
  );
}

export default App;
