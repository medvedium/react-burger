import React, { MouseEventHandler, ReactElement } from "react";
import styles from "./modal-overlay.module.css";
import Portal from "../portal/portal";
import PropTypes from "prop-types";

interface ModalOverlayProps {
  children: ReactElement;
  onClose: MouseEventHandler<HTMLDivElement>;
}

const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
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
