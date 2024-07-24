import {
  burgerConstructorReducer,
  initialState,
  burgerConstructorActions,
} from "../burgerConstructor.slice";
import { AnyAction } from "redux";

const { getOrderData, resetOrderModal, openOrderModal, closeOrderModal } =
  burgerConstructorActions;

describe("RTK burger constructor store", () => {
  it("Should return initial state", () => {
    expect(burgerConstructorReducer(undefined, {} as AnyAction)).toEqual(
      initialState
    );
  });

  it("Should reset order modal", () => {
    expect(burgerConstructorReducer(initialState, resetOrderModal)).toEqual(
      initialState
    );
  });

  it("Should open order modal", () => {
    expect(burgerConstructorReducer(initialState, openOrderModal)).toEqual({
      ...initialState,
      modalIsOpen: true,
    });
  });

  it("Should close order modal", () => {
    expect(burgerConstructorReducer(initialState, closeOrderModal)).toEqual(
      initialState
    );
  });

  it("Should fill order data", () => {
    expect(
      burgerConstructorReducer(
        initialState,
        getOrderData({
          name: "Order name",
          success: true,
          order: { number: 123 },
        })
      )
    ).toEqual({
      ...initialState,
      orderName: "Order name",
      orderNumber: 123,
    });
  });
});
