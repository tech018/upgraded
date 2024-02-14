import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {API_URL} from '@env';

const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // prepareHeaders: headers => {
    //   headers.set('x_app_key', config.appkey);
    //   return headers;
    // },
  }),
  tagTypes: ['Quotes'],
  endpoints: () => ({
    overrideExisting: true,
  }),
});

export default apiSlice;
