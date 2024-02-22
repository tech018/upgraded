import {createSlice} from '@reduxjs/toolkit';
import apiSlice from './api.slice';

const initialState = {
  token: null,
  email: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => ({
      ...state,
      token: action.payload.token,
      email: action.payload.email,
    }),
  },
});

export const {login, mailActive, mailChange} = userSlice.actions;

export default userSlice.reducer;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    PostRegister: builder.mutation({
      query: args => ({
        url: '/api/v1/register',
        method: 'POST',
        body: args,
      }),
    }),
    PostActivateUser: builder.mutation({
      query: args => ({
        url: `/api/users/verifyEmail?verificationCode=${args.OTP}&email=${args.email}`,
        method: 'POST',
        body: args,
      }),
    }),
    PostForgotPass: builder.mutation({
      query: args => ({
        url: `/api/users/forgotpassword?email=${args.email}`,
        method: 'POST',
      }),
    }),
    PutChangePass: builder.mutation({
      query: args => ({
        url: `/api/users/changepassword?email=${args.email}&otp=${args.OTP}&password=${args.password}`,
        method: 'PUT',
      }),
    }),
    PostResendCode: builder.mutation({
      query: args => ({
        url: `/api/users/resendcode?email=${args.email}`,
        method: 'POST',
      }),
    }),
    PostLoginUser: builder.mutation({
      query: args => ({
        url: '/api/users',
        method: 'POST',
        body: args,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  usePostRegisterMutation,
  usePostActivateUserMutation,
  usePostForgotPassMutation,
  usePutChangePassMutation,
  usePostResendCodeMutation,
  usePostLoginUserMutation,
} = userApiSlice;
