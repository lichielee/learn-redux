import { configureStore } from '@reduxjs/toolkit'

import functionReducerSlice from './reducerSlice'

export default configureStore({
  reducer: {
    function: functionReducerSlice
  }
})