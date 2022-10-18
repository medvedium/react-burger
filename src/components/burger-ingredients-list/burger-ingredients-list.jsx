import styles from "./burger-ingredients-list.module.css";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/reducers/ingredients";
import { _BUN, _SAUCE } from "../../utils/constants";

const BurgerIngredientsList = () => {
  const { isRequest, isRequestError, bun, sauce, main, activeTab } =
    useSelector((state) => state.ingredientsList);

  const dispatch = useDispatch();
  const listRef = useRef();
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  function scrollList(selector) {
    selector.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    if (bun) {
      activeTab === _BUN
        ? scrollList(bunRef.current)
        : activeTab === _SAUCE
        ? scrollList(sauceRef.current)
        : scrollList(mainRef.current);
    }
  }, [activeTab]);

  // const highlightActiveTab = () => {
  //   const bunElement = bunRef.current;
  //   Math.abs(bunElement.getBoundingClientRect().top);
  // };
  //
  // useEffect(() => {
  //   const list = listRef.current;
  //   list && list.addEventListener("scroll", highlightActiveTab);
  //   return () => {
  //     list && list.removeEventListener("scroll", highlightActiveTab);
  //   };
  // });

  if (isRequestError) {
    return "Error";
  } else if (isRequest) {
    return "Loading...";
  } else
    return (
      <div className={`${styles.list} custom-scroll`} ref={listRef}>
        <p className="text text_type_main-medium" ref={bunRef}>
          Булки
        </p>
        <div className={styles.section}>
          {bun.map((item) => (
            <BurgerIngredientsItem item={item} key={item._id} />
          ))}
        </div>
        <p className="text text_type_main-medium" ref={sauceRef}>
          Соусы
        </p>
        <div className={styles.section}>
          {sauce.map((item) => (
            <BurgerIngredientsItem item={item} key={item._id} />
          ))}
        </div>
        <p className="text text_type_main-medium" ref={mainRef}>
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
