import React from "react";
import styles from "./modal-overlay.module.css";
import Portal from "../portal/portal";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ModalOverlay = ({ children, onClose }) => {
  const modalIsOpen = useSelector((store) => store.modalReducer);
  if (!modalIsOpen) {
    return null;
  }

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
