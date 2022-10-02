import {ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './header-login.module.css'

const HeaderLogin = () => {
    return (
        <div className={styles.headerLogin}>
            <a href='/' className={styles.header_login_link}>
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default ml-2 text_color_inactive">
                    Личный кабинет
                </p>
            </a>
        </div>
    )
}

export default HeaderLogin