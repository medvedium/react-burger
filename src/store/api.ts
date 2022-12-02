import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IIngredient, IOrder,
  IOrderResponse,
  IUser,
  IUserResponse,
  ServerResponse,
} from "../models/models";
import {getCookie} from "../utils/cookie";

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
          authorization: `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify({ ingredients: addedIds }),
      }),
    }),
    forgotPassword: build.mutation<
      { success: boolean; message: string },
      string | undefined
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
      string | undefined
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
    getUser: build.query<IUserResponse, string | undefined>({
      query: (token: string) => ({
        url: `auth/user`,
        method: "GET",
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
        body: JSON.stringify({
          token: token,
        }),
        transformResponse: (response: ServerResponse) => response.data,
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
    getOrders: build.query<any, void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData((draft) => {
              draft = [data];
              return draft;
            });
          };

          ws.addEventListener("message", listener);
        } catch {
          console.log('error')
        }
        await cacheEntryRemoved;
        console.log("connection closed");
        ws.close();
      },
    }),
    getPersonalOrders: build.query<any, void>({
      queryFn: () => ({ data: [] as unknown | IOrder }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const accessToken = getCookie('token')
        const wsPersonal = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData((draft) => {
              draft = [data];
              return draft;
            });
          };

          wsPersonal.addEventListener("message", listener);
        } catch {
          console.log('error')
        }
        await cacheEntryRemoved;
        console.log("connection closed");
        wsPersonal.close();
      },
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
  useGetUserQuery,
  useRefreshTokenMutation,
  usePatchUserDataMutation,
  useGetOrdersQuery,
  useGetPersonalOrdersQuery
} = api;
