import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderNav from "../app-header-nav/app-header-nav";
import HeaderLogin from "../header-login/header-login";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <AppHeaderNav />
      <Link to={"/"} className={styles.logoWrap}>
        <Logo />
      </Link>
      <HeaderLogin />
    </header>
  );
};

export default AppHeader;
