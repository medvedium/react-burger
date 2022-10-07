import styles from "./constructor-total.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useState } from "react";

const ConstructorTotal = ({ value }) => {
  const [modalActive, setModalActive] = useState(false);

  const onClose = () => {
    setModalActive(false);
  };

  return (
    <div className={`${styles.total_block} mt-10`}>
      <p className="text text_type_digits-medium pr-2">{value}</p>
      <CurrencyIcon type={"primary"} />
      <Button
        htmlType={"submit"}
        type="primary"
        size="large"
        onClick={() => {
          setModalActive(true);
        }}
      >
        Оформить заказ
      </Button>
      {modalActive && (
        <Modal onClose={onClose} isOpened={modalActive}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

ConstructorTotal.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ConstructorTotal;
