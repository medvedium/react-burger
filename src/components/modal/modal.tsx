import React, { ReactElement, useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalHeader from "../modal-header/modal-header";
import styles from "./modal.module.css";

interface ModalProps {
  header?: string;
  onClose: () => void;
  children: ReactElement;
}

const Modal = ({ header, onClose, children }: ModalProps) => {
  useEffect(() => {
    const escapeListener = (event: KeyboardEvent) => {
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
      <div className={styles.container} data-testid="modal">
        <ModalHeader onClose={onClose} header={header} />
        {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;
