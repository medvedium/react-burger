/// <reference types="cypress" />
// @ts-check
import {
  AUTH_BTN,
  BASE_URL,
  BUN,
  CLOSE_BTN,
  CONSTRUCTOR,
  DETAILS_NAME,
  EMAIL,
  EMAIL_INPUT,
  LOCAL_URL,
  LOGIN_INPUT,
  MAIN,
  MODAL,
  ORDER_BTN,
  ORDER_NUMBER,
  PASSWORD,
  PASSWORD_INPUT,
} from "../fixtures/constants";

describe("Constructor", () => {
  beforeEach(function () {
    cy.visit(LOCAL_URL);
    cy.intercept("POST", `${BASE_URL}/auth/login`, {
      fixture: "auth.json",
    });
    cy.intercept("POST", `${BASE_URL}/orders`, {
      fixture: "order.json",
    });
  });
  it("should open modal after ingredient card click", () => {
    cy.get(BUN).click();
  });
  it("should display ingredient details in modal", () => {
    cy.get(BUN).click();
    cy.get(MODAL).as("modal");
    cy.get("@modal").find(DETAILS_NAME).as("name");
    cy.get("@name").should("contain", "Краторная булка N-200i");
  });
  it("should close modal after close button click", () => {
    cy.get(BUN).click();
    cy.get(CLOSE_BTN).click();
  });
  it("should drug ingredient to constructor", () => {
    cy.get(BUN).as("bun");
    cy.get(CONSTRUCTOR).as("constructor");
    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
  });
  it("should open modal with order after order button click", () => {
    cy.get(BUN).as("bun");
    cy.get(MAIN).as("main");
    cy.get(CONSTRUCTOR).as("constructor");
    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@main").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get(AUTH_BTN).click();
    cy.get(EMAIL_INPUT).type(EMAIL);
    cy.get(PASSWORD_INPUT).type(PASSWORD);
    cy.get(LOGIN_INPUT).click();
    cy.get(ORDER_BTN).click();
    cy.get(MODAL).as("modal");
    cy.get("@modal").find(ORDER_NUMBER).as("number");
    cy.get("@number").should("contain", "34429");
  });
  it("should close modal with order after close button click", () => {
    cy.get(BUN).as("bun");
    cy.get(MAIN).as("main");
    cy.get(CONSTRUCTOR).as("constructor");
    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get("@main").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get(AUTH_BTN).click();
    cy.get(EMAIL_INPUT).type(EMAIL);
    cy.get(PASSWORD_INPUT).type(PASSWORD);
    cy.get(LOGIN_INPUT).click();
    cy.get(ORDER_BTN).click();
    cy.get(CLOSE_BTN).click();
  });
});
