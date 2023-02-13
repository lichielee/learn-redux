import { configureStore } from '@reduxjs/toolkit'

import counterApi from './reducerSlice'

export default configureStore({
  reducer:{
    [counterApi.reducerPath]: counterApi.reducer
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(counterApi.middleware)
});