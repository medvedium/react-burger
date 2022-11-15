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
  }),
});

export const { useGetIngredientsQuery, usePostOrderDataMutation } = api;
