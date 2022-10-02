import styles from './burger-ingredients.module.css'
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorTotal from "../constructor-total/constructor-total";
import PropTypes from "prop-types";

const BurgerIngredients = (props) => {
    const totalArray = [];
    const prices = document.querySelectorAll('.constructor-element__price');
    prices.forEach(item => totalArray.push(item.textContent))
    const total = totalArray.reduce((previousValue, currentValue) => +previousValue + +currentValue, 0)

    return (
        <section className={styles.section}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className={'pl-8'}><ConstructorElement
                    key={0}
                    type="top"
                    isLocked={true}
                    text={props.data[0].name}
                    price={props.data[0].price}
                    thumbnail={props.data[0].image}
                /></div>
                <div className={styles.ingredients_list}>
                    {props.data.map((ingredient, index) => {
                        return ingredient.type !== 'bun' ? <div  key={ingredient._id}  className={styles.item}><DragIcon type="primary" /><ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image}/></div> : null
                    })}
                </div>
                <div className={'pl-8'}><ConstructorElement
                    key={1}
                    type="bottom"
                    isLocked={true}
                    text={props.data[props.data.length - 1].name}
                    price={props.data[props.data.length - 1].price}
                    thumbnail={props.data[props.data.length - 1].image}
                />
                </div>
            </div>
            <ConstructorTotal value={total}/>
        </section>
    )
}

ConstructorTotal.propTypes = {
    value: PropTypes.number.isRequired
}

export default BurgerIngredients