import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header-nav.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { ILocationState } from "../../models/models";

function AppHeaderNav() {
  const location = useLocation<ILocationState>();

  return (
    <nav>
      <ul className={styles.navList}>
        <li className="pr-10">
          <NavLink to="/" className="d-flex">
            <BurgerIcon
              type={location.pathname === "/" ? "primary" : "secondary"}
            />
            <p
              className={`text text_type_main-default ml-2 ${
                location.pathname === "/" ? "" : "text_color_inactive"
              }`}
            >
              Конструктор
            </p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/feed" className="d-flex" activeClassName="123">
            <ListIcon
              type={location.pathname === "/feed" ? "primary" : "secondary"}
            />
            <p
              className={`text text_type_main-default ml-2 ${
                location.pathname === "/feed" ? "" : "text_color_inactive"
              }`}
            >
              Лента заказов
            </p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppHeaderNav;
