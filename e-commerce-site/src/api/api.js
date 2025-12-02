import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery(), // no default base, we'll specify full URLs
  tagTypes: ["User", "Product", "Cart"],
  endpoints: (builder) => ({
    // PRODUCTS MICROSERVICE
    getProducts: builder.query({
      query: () => "http://localhost:8000/api/products",
      providesTags: ["Product"],
    }),

    // USER MICROSERVICE
    createUser: builder.mutation({
      query: (userData) => ({
        url: "http://localhost:9000/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getUserByUsername: builder.query({
      query: (username) => `http://localhost:9000/users/${username}`,
      providesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "http://localhost:9000/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // PASSWORD HASHER MICROSERVICE
    hashPassword: builder.mutation({
      query: (password) => ({
        url: "http://localhost:7000/hash",
        method: "POST",
        body: { password },
      }),
    }),

    verifyPassword: builder.mutation({
      query: (data) => ({
        url: "http://localhost:7000/verify",
        method: "POST",
        body: data, // { password, hashedPassword }
      }),
    }),

    // CART MICROSERVICE
    getCart: builder.query({
      query: (username) => `http://localhost:5000/cart/${username}`,
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: ({ username, product }) => ({
        url: `http://localhost:5000/cart/${username}/add`,
        method: "POST",
        body: { item: { ...product } },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: ({ username, itemId }) => ({
        url: `http://localhost:5000/cart/${username}/remove`,
        method: "POST",
        body: { itemId: itemId },
      }),
      invalidatesTags: ["Cart"],
    }),

    setCart: builder.mutation({
      query: ({ username, cart }) => ({
        url: `http://localhost:5000/cart/${username}/set`,
        method: "POST",
        body: { cart },
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: (username) => ({
        url: `http://localhost:5000/cart/${username}/clear`,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateUserMutation,
  useGetUserByUsernameQuery,
  useLoginUserMutation,
  useHashPasswordMutation,
  useVerifyPasswordMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useSetCartMutation,
  useClearCartMutation,
} = api;
