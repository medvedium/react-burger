import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import data from '../../utils/data.json';
import styles from './app.module.css'

function App() {
    return (
        <>
            <main className={styles.main}>
                <AppHeader/>
                <div className={styles.app_container}>
                    <BurgerConstructor data={data}/>
                    <BurgerIngredients data={data}/>
                </div>
            </main>
        </>
    );
}

export default App;
