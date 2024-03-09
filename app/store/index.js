import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import apiSlice from './api.slice';
import authReducer from './auth.slice';
import ApplicationReducer from './application.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    application: ApplicationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
