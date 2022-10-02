import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor-item.module.css'

const BurgerConstructorItem = ({item}) => {
    return (
        <div className={styles.card}>
            <img src={item.image} alt={item.name}/>
            <div className={`${styles.price} pt-1 pt-2`}>
                <p className="text text_type_digits-default mr-2">{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
            <Counter count={1} size="default"/>
        </div>
    )
}


export default BurgerConstructorItem