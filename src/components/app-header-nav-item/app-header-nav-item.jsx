import styles from "./app-header-nav-item.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AppHeaderNavItem = ({ children, isActive, value }) => {
  return (
    <li>
      <Link to="/main" className={`${styles.listItem} pl-5 pr-5`}>
        {children}
        <p
          className={`text text_type_main-default ml-2 ${
            isActive ? null : "text_color_inactive"
          }`}
        >
          {value}
        </p>
      </Link>
    </li>
  );
};

AppHeaderNavItem.propTypes = {
  isActive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default AppHeaderNavItem;
