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
    subscribeToEvents: build.query<any, void>({
      queryFn: () => ({ data: [] }),

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all')
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data)
            // if (!isMessage(data) || data.channel !== arg) return

            updateCachedData((draft) => {
              draft = [data]
              return draft
            })
          }

          ws.addEventListener('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        console.log('connection closed')
        ws.close()
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
  useSubscribeToEventsQuery
} = api;
