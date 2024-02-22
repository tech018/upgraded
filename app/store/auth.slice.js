import {createSlice} from '@reduxjs/toolkit';
import apiSlice from './api.slice';

const initialState = {
  token: null,
  email: null,
};

export const authSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    ucredentials: (state, action) => ({
      ...state,
      token: action.payload.token,
      email: action.payload.email,
    }),
  },
});

export const {ucredentials} = authSlice.actions;

export default authSlice.reducer;

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    PostRegister: builder.mutation({
      query: args => ({
        url: '/auth/v1/register',
        method: 'POST',
        body: args,
      }),
    }),
    PutActivateUser: builder.mutation({
      query: args => ({
        url: `/auth/v1/activate?email=${args.email}&otp=${args.otp}`,
        method: 'PUT',
        body: args,
      }),
    }),
    PutRecoverAccess: builder.mutation({
      query: args => ({
        url: `/auth/v1/recoveraccess?email=${args.email}`,
        method: 'PUT',
      }),
    }),
    PutChangePass: builder.mutation({
      query: args => ({
        url: `/auth/v1/changepassword?email=${args.email}&otp=${args.otp}&password=${args.password}`,
        method: 'PUT',
      }),
    }),
    PostResendCode: builder.mutation({
      query: args => ({
        url: `/auth/v1/resendcode?email=${args.email}`,
        method: 'POST',
      }),
    }),
    PostLoginUser: builder.mutation({
      query: args => ({
        url: '/auth/v1/login',
        method: 'POST',
        body: args,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  usePostRegisterMutation,
  usePutActivateUserMutation,
  usePutRecoverAccessMutation,
  usePutChangePassMutation,
  usePostResendCodeMutation,
  usePostLoginUserMutation,
} = authApiSlice;
