import React, { MouseEventHandler } from "react";
import styles from "./modal-header.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

interface ModalProps {
  header?: string;
  onClose: MouseEventHandler<HTMLDivElement>;
}

const ModalHeader = ({ header, onClose }: ModalProps) => {
  return (
    <div className={styles.modal_header}>
      <p className="text text_type_main-large">{header}</p>
      <div
        className={styles.modal_close}
        onClick={onClose}
        data-testid="modal-close-button"
      >
        <CloseIcon type="primary" />
      </div>
    </div>
  );
};

ModalHeader.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ModalHeader;
