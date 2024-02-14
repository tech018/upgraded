import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import apiSlice from './api.slice';

// import userReducer from './auth.slice';
// import userInfoReducer from './userinfo.slice';
// import applicationReducer from './application.slice';
const store = configureStore({
  reducer: {
    // user: userReducer,
    // userInfo: userInfoReducer,
    // application: applicationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
