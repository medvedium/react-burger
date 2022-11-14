import React from "react";
import styles from "./loader.module.css";
import loader from "../../images/loader.svg";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
