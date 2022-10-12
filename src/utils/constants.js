import PropTypes from "prop-types";

export const ingredientItem = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const _BUN = "bun";
export const _SAUCE = "sauce";
export const _MAIN = "main";

export const _URL = "https://norma.nomoreparties.space/api/ingredients";

export const sortIngredients = (data) => {
  const sortedData = [];
  let bunAdded = false;

  data.map((item, index) => {
    if (item.type !== "bun" && index % 2 === 0) {
      sortedData.push(item);
    }
    if (item.type === "bun" && !bunAdded) {
      bunAdded = true;
      sortedData.unshift(item);
    }
    return null;
  });
  return sortedData;
};
