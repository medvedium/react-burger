import styles from './constructor-total.module.css';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorTotal = (props) => {
    return (
        <div className={`${styles.total_block} mt-10`}>
            <p className="text text_type_digits-medium pr-2">{props.value}</p>
            <CurrencyIcon type={"primary"}/>
            <Button htmlType={'submit'} type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    )
}

export default ConstructorTotal