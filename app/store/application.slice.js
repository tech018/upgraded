import {createSlice} from '@reduxjs/toolkit';
import apiSlice from './api.slice';
const initialState = {
  driversInfo: null,
  applications: {
    plateNumber: null,
    applicationType: null,
    vehicleType: null,
    image: null,
  },
};

export const applicationSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    uDriversInfo: (state, action) => ({
      ...state,
      driversInfo: action.payload,
    }),
    uPlateNumber: (state, action) => {
      state.applications.plateNumber = action.payload;
      return state;
    },
    uApplicantType: (state, action) => {
      state.applications.applicationType = action.payload;
      return state;
    },
    uVehicleType: (state, action) => {
      state.applications.vehicleType = action.payload;
      return state;
    },
    uImage: (state, action) => {
      state.applications.image = action.payload;
      return state;
    },
  },
});

export const {
  uDriversInfo,
  uPlateNumber,
  uApplicantType,
  uVehicleType,
  uImage,
} = applicationSlice.actions;

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
    PostCreateApplication: builder.mutation({
      query: args => ({
        url: `/application/v1/create/application?`,
        method: 'POST',
        body: args.payload,
        headers: {
          authorization: `Bearer ${args.token}`,
        },
      }),
    }),
    PostUploadOR: builder.mutation({
      query: args => ({
        url: `/application/v1/oruploader?plateNumber=${args.plateNumber}`,
        method: 'POST',
        body: args.image,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDriverInfoMutation,
  usePostCreateApplicationMutation,
  usePostUploadORMutation,
} = applicationApiSlice;
