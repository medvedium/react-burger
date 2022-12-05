import React from "react";
import styles from "../feed-details/feed-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../models/models";

interface IFeedDetailsItemProps {
  item: IIngredient;
  count: number;
}

const FeedDetailsItem = ({ item, count }: IFeedDetailsItemProps) => {
  return (
    <li className={`${styles.list_item} mb-4`}>
      <div className={styles.item_image}>
        <img src={item.image_mobile} alt={item.name} />
      </div>
      <p className="text text_type_main-default ml-4 mr-4">{item.name}</p>
      <div className={styles.item_price}>
        {count > 1 && (
          <>
            <p className="text text_type_digits-default">{count}</p>
            &nbsp;x&nbsp;
          </>
        )}
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type={"primary"} />
      </div>
    </li>
  );
};

export default FeedDetailsItem;
