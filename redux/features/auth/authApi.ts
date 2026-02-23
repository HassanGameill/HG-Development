import axiosErrorHandler from "@/utils/axiosErrorHandler";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type TRegistration = {
  message: string;
  activationToken: string;
};

type TRegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ___ Endpoints Here ___
    register: builder.mutation<TRegistration, TRegistrationData>({
      query: (data) => ({
        url: "users/registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          axiosErrorHandler(error);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "users/activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),



    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "users/login-user",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          axiosErrorHandler(error);
        }
      },
    }),



    socialAuth: builder.mutation({
      query: ({ email, password, name , avatar }) => ({
        url: "users/social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          axiosErrorHandler(error);
        }
      },
    }),


    logOut: builder.query({
      query: () => ({
        url: "users/get-logout",
        method: "GET",
        
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            userLoggedOut()
          );
        } catch (error) {
          axiosErrorHandler(error);
        }
      },
    }),


  }),
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogOutQuery } = authApi;
