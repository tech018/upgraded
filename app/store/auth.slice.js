import {createSlice} from '@reduxjs/toolkit';
import apiSlice from './api.slice';

const initialState = {
  token: null,
  email: null,
  changepass: {
    otp: null,
    newpassword: null,
    email: null,
  },
  userInfo: null,
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
    uotp: (state, action) => {
      state.changepass.otp = action.payload;
      return state;
    },
    uemail: (state, action) => {
      state.changepass.email = action.payload;
      return state;
    },
    uinfo: (state, action) => {
      state.userInfo = action.payload;
      return state;
    },
    ulogout: (state, action) => {
      state.userInfo = null;
      state.changepass = null;
      state.email = null;
      state.token = action.payload;
      return state;
    },
  },
});

export const {ucredentials, uotp, uemail, uinfo, ulogout} = authSlice.actions;

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
        method: 'POST',
      }),
    }),
    PutChangePass: builder.mutation({
      query: args => ({
        url: `/auth/v1/changepassword?email=${args.email}&otp=${args.otp}&newpassword=${args.password}`,
        method: 'POST',
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
    PostRequirements: builder.mutation({
      query: args => ({
        url: `/application/v1/requirements?data=${args.data}`,
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
  usePostRequirementsMutation,
} = authApiSlice;
