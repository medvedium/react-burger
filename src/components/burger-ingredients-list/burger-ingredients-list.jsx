import styles from "./burger-ingredients-list.module.css";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _BUN, _MAIN, _SAUCE } from "../../utils/constants";
import { CHOOSE_TAB } from "../../services/actions/ingredient";

const BurgerIngredientsList = () => {
  const { isRequest, isRequestError, bun, sauce, main } = useSelector(
    (state) => state.ingredientsList
  );

  const dispatch = useDispatch();
  const listRef = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const highlightActiveTab = () => {
    const bunPos = Math.abs(
      bunRef.current.getBoundingClientRect().top -
        listRef.current.getBoundingClientRect().top
    );
    const saucePos = Math.abs(
      sauceRef.current.getBoundingClientRect().top -
        listRef.current.getBoundingClientRect().top
    );
    const mainPos = Math.abs(
      mainRef.current.getBoundingClientRect().top -
        listRef.current.getBoundingClientRect().top
    );

    if (bunPos < saucePos && bunPos < mainPos) {
      dispatch({ type: CHOOSE_TAB, value: _BUN });
    } else if (saucePos < bunPos && saucePos < mainPos) {
      dispatch({ type: CHOOSE_TAB, value: _SAUCE });
    } else if (mainPos < bunPos && mainPos < saucePos) {
      dispatch({ type: CHOOSE_TAB, value: _MAIN });
    }
  };

  if (isRequestError) {
    return "Error";
  } else if (isRequest) {
    return "Loading...";
  } else
    return (
      <div
        className={`${styles.list} custom-scroll`}
        ref={listRef}
        onScroll={(e) => highlightActiveTab()}
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
