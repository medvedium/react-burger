import AppHeaderNavItem from "../app-header-nav-item/app-header-nav-item";
import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header-nav.module.css'
import PropTypes from "prop-types";

function AppHeaderNav() {
    return (
        <nav>
            <ul className={styles.navList}>
                <AppHeaderNavItem isActive={true} value={'Конструктор'}>
                    <BurgerIcon type={"primary"} className={'mr-2'}/>
                </AppHeaderNavItem>
                <AppHeaderNavItem isActive={false} value={'Лента заказов'}>
                    <ListIcon type={"secondary"} className={'mr-2'}/>
                </AppHeaderNavItem>
            </ul>
        </nav>
    )
}


AppHeaderNavItem.propTypes = {
    isActive: PropTypes.bool,
    value: PropTypes.string
}

export default AppHeaderNav

