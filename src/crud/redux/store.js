import { configureStore } from '@reduxjs/toolkit'

import counterApi from './reducerSlice'

export default configureStore({
  reducer:{
    [counterApi.reducerPath]: counterApi.reducer
  },
  //createApi实际上是插入一个中间件，来拦截和转换action
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(counterApi.middleware)
});