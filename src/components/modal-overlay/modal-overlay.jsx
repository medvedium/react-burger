import React from "react";
import styles from "./modal-overlay.module.css";
import Portal from "../portal/portal";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose }) => {
  return (
    <Portal>
      <div className={styles.container}>
        <div className={styles.modal_overlay} onClick={onClose} />
        {children}
      </div>
    </Portal>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
