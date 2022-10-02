import BurgerConstructorTabs from "../burger-constructor-tabs/burger-constructor-tabs";
import BurgerConstructorList from "../burger-constructor-list/burger-constructor-list";
import PropTypes from "prop-types";
import {ingredientItem} from "../../utils/constants";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

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


BurgerConstructorItem.propTypes = {
    data: PropTypes.arrayOf(ingredientItem)
}

export default BurgerConstructor