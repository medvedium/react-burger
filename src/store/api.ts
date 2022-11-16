import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IIngredient, ServerResponse } from "../models/models";

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
    postOrderData: build.mutation<any, any>({
      query: (addedIds: string[]) => ({
        url: `orders`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: addedIds }),
      }),
    }),
    forgotPassword: build.mutation<any, any>({
      query: (email: string) => ({
        url: `password-reset`,
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }),
    }),
    resetPassword: build.mutation<any, any>({
      query: (userData: { password: string; token: string }) => ({
        url: `password-reset/reset`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }),
    }),
    register: build.mutation<any, any>({
      query: (userData: { email: string; password: string; name: string }) => ({
        url: `auth/register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }),
    }),
    login: build.mutation<any, any>({
      query: (userData: { email: string; password: string }) => ({
        url: `auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }),
    }),
    logout: build.mutation<any, any>({
      query: (token: string) => ({
        url: `auth/logout`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      }),
    }),
    getUser: build.query<any, any>({
      query: (token: string) => ({
        url: `auth/user`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    refreshToken: build.mutation<any, any>({
      query: (token: string) => ({
        url: `auth/token`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
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
  useGetUserQuery,
  useRefreshTokenMutation,
} = api;
