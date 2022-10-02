import styles from './app-header-nav-item.module.css'

const AppHeaderNavItem = (props) => {
    return (
        <li>
            <a href='/' className={`${styles.listItem} pl-5 pr-5`}>
                {props.children}
                <p className={`text text_type_main-default ml-2 ${props.isActive ? null : "text_color_inactive"}`}>
                    {props.value}
                </p>
            </a>
        </li>
    )
}


export default AppHeaderNavItem