import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import FeedDetailsItem from "../feed-details-item/feed-details-item";
import styles from "./feed-details.module.css";

const FeedDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { items } = useAppSelector((state) => state.ingredients);
  const { orders } = useAppSelector((state) => state.ws.message);

  const item = orders && orders.find((order) => order._id === id);

  let total = 0;
  items.map((ingr) => {
    if (item && item.ingredients.indexOf(ingr._id) >= 0) {
      let idx = item.ingredients.indexOf(ingr._id);
      let indices = [];
      while (idx !== -1) {
        indices.push(idx);
        idx = item.ingredients.indexOf(ingr._id, idx + 1);
      }
      if (ingr.type === "bun") {
        total += ingr.price * 2;
      } else {
        total += +ingr.price * indices.length;
      }
    }
    return null;
  });

  return (
    <div className={styles.container}>
      <div className={styles.order_number}>
        <p className="text text_type_digits-default mb-10">
          #{item && item.number}
        </p>
      </div>
      <div className={styles.order_name}>
        <p className="text text_type_main-medium mb-3">{item && item.name}</p>
      </div>
      <div className={styles.order_status}>
        <p
          className={`${
            item && item.status === "done" && "text_color_success"
          } text text_type_main-default mb-15`}
        >
          {item && item.status === "created" && "Создан"}
          {item && item.status === "pending" && "Готовится"}
          {item && item.status === "done" && "Выполнен"}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`${styles.list} mb-10 custom-scroll`}>
        {items.map((ingr, index) => {
          if (item && item.ingredients.indexOf(ingr._id) >= 0) {
            let idx = item.ingredients.indexOf(ingr._id);
            let indices = [];
            while (idx !== -1) {
              indices.push(idx);
              idx = item.ingredients.indexOf(ingr._id, idx + 1);
            }
            if (ingr.type === "bun") {
              return <FeedDetailsItem key={index} item={ingr} count={2} />;
            } else {
              return (
                <FeedDetailsItem
                  key={index}
                  item={ingr}
                  count={indices.length}
                />
              );
            }
          }
          return null;
        })}
      </ul>
      <footer className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {item && <FormattedDate date={new Date(item.createdAt)} />}
        </p>
        <div className={styles.total}>
          <p className="text text_type_digits-default mr-2">{total}</p>
          <CurrencyIcon type={"primary"} />
        </div>
      </footer>
    </div>
  );
};

export default FeedDetails;
