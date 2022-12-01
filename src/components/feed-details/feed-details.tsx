import React from 'react';
import styles from './feed-details.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import FeedDetailsItem from "../feed-details-item/feed-details-item";

const FeedDetails = () => {
	return (
		<div className={styles.container}>
			<div className={styles.order_number}>
				<p className="text text_type_digits-default mb-10">#034535</p>
			</div>
			<div className={styles.order_name}>
				<p className="text text_type_main-medium mb-3">
					Death Star Starship Main бургер
				</p>
			</div>
			<div className={styles.order_status}>
				<p className="text text_type_main-default mb-15">Выполнен</p>
			</div>
			<p className="text text_type_main-medium mb-6">
				Состав:
			</p>
			<ul className={`${styles.list} mb-10 custom-scroll`}>
				<FeedDetailsItem />
				<FeedDetailsItem />
				<FeedDetailsItem />
				<FeedDetailsItem />
				<FeedDetailsItem />
				<FeedDetailsItem />
				<FeedDetailsItem />
				<FeedDetailsItem />
				<FeedDetailsItem />
			</ul>
			<footer className={styles.footer}>
				<p className="text text_type_main-default text_color_inactive">
					Сегодня, 16:20 i-GMT+3
				</p>
				<div className={styles.total}>
					<p className="text text_type_digits-default mr-2">900</p>
					<CurrencyIcon type={"primary"} />
				</div>
			</footer>
		</div>
	);
};

export default FeedDetails;