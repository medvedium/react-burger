import React from 'react';
import styles from "../feed-details/feed-details.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const FeedDetailsItem = () => {
	return (
		<li className={`${styles.list_item} mb-4`}>
			<div className={styles.item_image}></div>
			<p className="text text_type_main-default ml-4 mr-4">Филе Люминесцентного тетраодонтимформа</p>
			<div className={styles.item_price}>
				<p className="text text_type_digits-default">2</p>
				x
				<p className="text text_type_digits-default">300</p>
				<CurrencyIcon type={"primary"} />
			</div>
		</li>
	);
};

export default FeedDetailsItem;