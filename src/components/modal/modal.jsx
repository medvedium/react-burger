import React, { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ isOpened, header, onClose, children }) => {
  const escapeListener = (event) => {
    if (event.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", escapeListener);
    return () => {
      window.removeEventListener("keydown", escapeListener);
    };
  });

  return (
    <ModalOverlay isOpened={isOpened} onClose={onClose}>
      <div className={styles.container}>
        <ModalHeader onClose={onClose} header={header} />
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default Modal;
