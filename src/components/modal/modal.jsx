import React, { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Modal = ({ header, onClose, children }) => {
  const modalIsOpen = useSelector((store) => store.rootReducer.modalReducer);
  useEffect(() => {
    if (!modalIsOpen) return;

    const escapeListener = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", escapeListener);
    return () => {
      window.removeEventListener("keydown", escapeListener);
    };
  });

  return (
    <ModalOverlay onClose={onClose}>
      <div className={styles.container}>
        <ModalHeader onClose={onClose} header={header} />
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
