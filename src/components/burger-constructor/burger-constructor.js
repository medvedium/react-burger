import BurgerConstructorTabs from "../burger-constructor-tabs/burger-constructor-tabs";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";

const BurgerConstructor = (data) => {
    return(
        <section>
            <p className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>
            <BurgerConstructorTabs/>
            <BurgerConstructorList ingredients={data.data}/>
        </section>
    )
}



export default BurgerConstructor