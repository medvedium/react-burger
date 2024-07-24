import { authActions, authReducer, initialState } from "../auth.slice";
import { AnyAction } from "redux";

const { loginSuccess, logout, setUser, refreshUser } = authActions;

describe("RTK auth store", () => {
  test("Should return initial state", () => {
    expect(authReducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  test("Login success", () => {
    expect(authReducer(initialState, loginSuccess)).toEqual({
      ...initialState,
      isAuth: true,
    });
  });

  test("Logout success", () => {
    expect(authReducer(initialState, logout)).toEqual(initialState);
  });

  test("Adding user data", () => {
    expect(
      authReducer(
        initialState,
        setUser({
          email: "some@mail.com",
          name: "Name",
          password: "password",
          isAuth: true,
        })
      )
    ).toEqual({
      email: "some@mail.com",
      name: "Name",
      password: "password",
      isAuth: true,
    });
  });

  test("Refresh user data", () => {
    expect(
      authReducer(
        initialState,
        refreshUser({ user: { name: "Name", email: "some@mail.com" } })
      )
    ).toEqual({
      ...initialState,
      email: "some@mail.com",
      name: "Name",
      isAuth: true,
    });
  });
});
