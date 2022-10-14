import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderNav from "../app-header-nav/app-header-nav";
import HeaderLogin from "../header-login/header-login";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <AppHeaderNav />
      <div className={styles.logoWrap}>
        <Logo />
      </div>
      <HeaderLogin />
    </header>
  );
};

export default AppHeader;
