import {createSlice} from '@reduxjs/toolkit';
import apiSlice from './api.slice';
const initialState = {
  driversInfo: null,
};

export const applicationSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    uDriversInfo: (state, action) => ({
      ...state,
      driversInfo: action.payload,
    }),
  },
});

export const {uDriversInfo} = applicationSlice.actions;

export default applicationSlice.reducer;

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    GetDriverInfo: builder.mutation({
      query: args => ({
        url: `/application/v1/getdriverinfo?email=${args.email}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${args.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useGetDriverInfoMutation} = applicationApiSlice;
