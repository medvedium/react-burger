import { initialState, modalActions, modalReducer } from "../modal.slice";

const { openModal, closeModal } = modalActions;

describe("RTK modal store", () => {
  test("Modal should open", () => {
    expect(modalReducer(initialState, openModal)).toEqual({
      ...initialState,
      modalIsOpen: true,
    });
  });

  test("Modal should close", () => {
    expect(modalReducer(initialState, closeModal)).toEqual({
      ...initialState,
      modalIsOpen: false,
    });
  });
});
