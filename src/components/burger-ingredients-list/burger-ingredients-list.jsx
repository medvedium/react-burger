import styles from "./burger-ingredients-list.module.css";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { useEffect, useRef } from "react";
import { _BUN, _MAIN, _SAUCE } from "../../utils/constants";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";
import Loader from "../loader/loader";

const BurgerIngredientsList = () => {
  const { bun, sauce, main, isRequest, isRequestError } = useAppSelector(
    (state) => state.ingredients
  );
  const { chooseTab } = useActions();

  const listRef = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    chooseTab(_BUN);
  }, [chooseTab]);

  function highlightActiveTab(listRef, bunRef, sauceRef, mainRef) {
    const bunPos = Math.abs(
      bunRef?.current.getBoundingClientRect().top -
        listRef?.current.getBoundingClientRect().top
    );
    const saucePos = Math.abs(
      sauceRef?.current.getBoundingClientRect().top -
        listRef?.current.getBoundingClientRect().top
    );
    const mainPos = Math.abs(
      mainRef?.current.getBoundingClientRect().top -
        listRef?.current.getBoundingClientRect().top
    );

    if (bunPos < saucePos && bunPos < mainPos) {
      chooseTab(_BUN);
    } else if (saucePos < bunPos && saucePos < mainPos) {
      chooseTab(_SAUCE);
    } else if (mainPos < bunPos && mainPos < saucePos) {
      chooseTab(_MAIN);
    }
  }

  if (isRequest) return <Loader />;
  else if (isRequestError) return "Произошла ошибка";
  else
    return (
      <div
        className={`${styles.list} custom-scroll`}
        ref={listRef}
        onScroll={(e) => highlightActiveTab(listRef, bunRef, sauceRef, mainRef)}
      >
        <p
          className="text text_type_main-medium"
          ref={bunRef}
          data-tab-target={_BUN}
        >
          Булки
        </p>
        <div className={styles.section}>
          {bun.map((item) => (
            <BurgerIngredientsItem item={item} key={item._id} />
          ))}
        </div>
        <p
          className="text text_type_main-medium"
          ref={sauceRef}
          data-tab-target={_SAUCE}
        >
          Соусы
        </p>
        <div className={styles.section}>
          {sauce.map((item) => (
            <BurgerIngredientsItem item={item} key={item._id} />
          ))}
        </div>
        <p
          className="text text_type_main-medium"
          ref={mainRef}
          data-tab-target={_MAIN}
        >
          Начинки
        </p>
        <div className={styles.section}>
          {main.map((item) => (
            <BurgerIngredientsItem item={item} key={item._id} />
          ))}
        </div>
      </div>
    );
};

export default BurgerIngredientsList;
