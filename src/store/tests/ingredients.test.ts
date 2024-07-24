import {
  ingredientsActions,
  ingredientsReducer,
  initialState,
} from "../ingredients.slice";

const {
  getIngredients,
  getIngredientsFailed,
  chooseTab,
  addIngredient,
  addBun,
  removeIngredient,
  getTotalPrice,
  updateSelectedIngredients,
  resetConstructor,
} = ingredientsActions;

const sauceItem = {
  calories: 99,
  carbohydrates: 42,
  fat: 24,
  image: "https://code.s3.yandex.net/react/code/sauce-03.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
  name: "Соус традиционный галактический",
  price: 15,
  proteins: 42,
  type: "sauce",
  __v: 0,
  _id: "60d3b41abdacab0026a733ce",
  index: 0,
  count: 0,
  uid: "",
};

const mainItem = {
  calories: 420,
  carbohydrates: 33,
  fat: 244,
  image: "https://code.s3.yandex.net/react/code/meat-02.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  name: "Мясо бессмертных моллюсков Protostomia",
  price: 1337,
  proteins: 433,
  type: "main",
  __v: 0,
  _id: "60d3b41abdacab0026a733c9",
  count: 0,
  index: 0,
  uid: "",
};

const bunItem = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  name: "Краторная булка N-200i",
  price: 1255,
  proteins: 80,
  type: "bun",
  __v: 0,
  _id: "60d3b41abdacab0026a733c6",
  count: 0,
  index: 0,
  uid: "",
};

const bunItemSecond = {
  _id: "60d3b41abdacab0026a733c7",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
  count: 0,
  uid: "",
};

describe("RTK ingredients store", () => {
  it("Ingredients should be added to store", () => {
    expect(
      ingredientsReducer(
        initialState,
        getIngredients([sauceItem, mainItem, bunItem])
      )
    ).toEqual({
      ...initialState,
      items: [sauceItem, mainItem, bunItem],
      sauce: [sauceItem],
      main: [mainItem],
      bun: [bunItem],
      isRequest: false,
    });
  });
  it("Tab should to be chosen", () => {
    expect(ingredientsReducer(initialState, chooseTab("bun"))).toEqual({
      ...initialState,
      activeTab: "bun",
    });
  });

  it("Should add selected bun", () => {
    let state: typeof initialState = {
      ...initialState,
      bun: [bunItem, bunItemSecond],
    };
    expect(ingredientsReducer(state, addBun(bunItem))).toEqual({
      ...state,
      bun: [
        {
          ...bunItem,
          count: 2,
        },
        bunItemSecond,
      ],
      selectedBun: bunItem,
    });
  });

  it("Should add selected ingredient", () => {
    let state: typeof initialState = {
      ...initialState,
      main: [mainItem],
    };
    expect(
      ingredientsReducer(
        state,
        addIngredient({
          ...mainItem,
          count: 1,
        })
      )
    ).toEqual({
      ...state,
      main: [
        {
          ...mainItem,
          count: 1,
        },
      ],
      selectedIngredients: [
        {
          ...mainItem,
          count: 1,
        },
      ],
    });
  });

  it("Should remove selected ingredient", () => {
    let state: typeof initialState = {
      ...initialState,
      main: [
        {
          ...mainItem,
          count: 2,
        },
      ],
      selectedIngredients: [
        {
          ...mainItem,
          count: 2,
          uid: "7Bwr2128",
        },
        {
          ...mainItem,
          uid: "7Bwr6439",
        },
      ],
    };
    expect(
      ingredientsReducer(
        state,
        removeIngredient({
          ...mainItem,
          count: 1,
          uid: "7Bwr2128",
        })
      )
    ).toEqual({
      ...state,
      main: [
        {
          ...mainItem,
          count: 1,
        },
      ],
      selectedIngredients: [
        {
          ...mainItem,
          uid: "7Bwr6439",
        },
      ],
    });
  });

  it("Should cause error", () => {
    expect(ingredientsReducer(initialState, getIngredientsFailed)).toEqual({
      ...initialState,
      isRequest: false,
      isRequestError: true,
    });
  });

  it("Constructor should reset", () => {
    expect(ingredientsReducer(initialState, resetConstructor)).toEqual(
      initialState
    );
  });

  it("Get total price should got", () => {
    let state: typeof initialState = {
      ...initialState,
      selectedIngredients: [mainItem],
      selectedBun: bunItem,
      total: 0,
    };
    expect(ingredientsReducer(state, getTotalPrice)).toEqual({
      ...state,
      total: 3847,
    });
  });

  it("Should update selected ingredients", () => {
    let state: typeof initialState = {
      ...initialState,
      selectedIngredients: [mainItem, sauceItem],
    };
    expect(
      ingredientsReducer(
        state,
        updateSelectedIngredients([sauceItem, mainItem])
      )
    ).toEqual({
      ...state,
      selectedIngredients: [sauceItem, mainItem],
    });
  });
});
