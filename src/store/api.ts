import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IIngredient,
  IOrderResponse,
  IUser,
  IUserResponse,
  ServerResponse,
} from "../models/models";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://norma.nomoreparties.space/api/",
  }),
  endpoints: (build) => ({
    getIngredients: build.query<IIngredient[], string>({
      query: () => ({
        url: `ingredients`,
      }),
      transformResponse: (response: ServerResponse) => response.data,
    }),
    postOrderData: build.mutation<IOrderResponse, string[]>({
      query: (addedIds: string[]) => ({
        url: `orders`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: addedIds }),
      }),
    }),
    forgotPassword: build.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (email: string) => ({
        url: `password-reset`,
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }),
    }),
    resetPassword: build.mutation<
      {
        success: boolean;
        message: string;
      },
      IUser
    >({
      query: (userData) => ({
        url: `password-reset/reset`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }),
    }),
    register: build.mutation<IUserResponse, IUser>({
      query: (userData: { email: string; password: string; name: string }) => ({
        url: `auth/register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }),
    }),
    login: build.mutation<IUserResponse, IUser>({
      query: (userData: { email: string; password: string }) => ({
        url: `auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }),
    }),
    logout: build.mutation<
      {
        success: boolean;
        message: string;
      },
      string
    >({
      query: (token: string) => ({
        url: `auth/logout`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      }),
    }),
    getUser: build.query<IUserResponse, string>({
      query: (token: string) => ({
        url: `auth/user`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    refreshToken: build.mutation<IUserResponse, string>({
      query: (token: string) => ({
        url: `auth/token`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      }),
    }),
    patchUserData: build.mutation<IUserResponse, IUser>({
      query: (userData: IUser) => ({
        url: `auth/user`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: userData.name,
        }),
      }),
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  usePostOrderDataMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useLazyGetUserQuery,
  useRefreshTokenMutation,
  usePatchUserDataMutation,
} = api;
