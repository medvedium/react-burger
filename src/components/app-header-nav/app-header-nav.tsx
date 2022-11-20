import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header-nav.module.css";
import { Link, useLocation } from "react-router-dom";

function AppHeaderNav() {
  const location = useLocation<ILocationState>();

  return (
    <nav>
      <ul className={styles.navList}>
        <li className="pr-10">
          <Link to="/" className="d-flex">
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
          </Link>
        </li>

        <li>
          <Link to="/" className="d-flex">
            <ListIcon type={"secondary"} />
            <p className="text text_type_main-default ml-2 text_color_inactive">
              Лента заказов
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AppHeaderNav;
