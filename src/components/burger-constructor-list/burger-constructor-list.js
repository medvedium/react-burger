import styles from './burger-constructor-list.module.css';
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import PropTypes from "prop-types";
import {ingredientItem} from "../../utils/constants";

const BurgerConstructorList = ({ingredients}) => {
    return (
        <div className={styles.list}>
            <p className="text text_type_main-medium" id={'bun'}>
                Булки
            </p>
            <div className={styles.section}>
                {ingredients.map((item, index) => {
                    return item.type === 'bun' ? <BurgerConstructorItem item={item} key={index} /> : null
                })}
            </div>
            <p className="text text_type_main-medium">
                Соусы
            </p>
            <div className={styles.section}>
            {ingredients.map((item, index) => {
                return item.type === 'sauce' ? <BurgerConstructorItem item={item} key={index} /> : null
            })}
            </div>
            <p className="text text_type_main-medium">
                Начинки
            </p>
            <div className={styles.section}>
            {ingredients.map((item, index) => {
                return item.type === 'main' ? <BurgerConstructorItem item={item} key={index} /> : null
            })}
            </div>
        </div>
    )
}

BurgerConstructorList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientItem)
}

export default BurgerConstructorList