import { configureStore } from '@reduxjs/toolkit'

import functionReducerSlice, {stateKey} from './reducerSlice'

export default configureStore({
  reducer: {
    //reducer对象的key，是状态的key
    //这里建立了state的切片（state的某个属性），与对应的reducer之间的关系
    [stateKey]: functionReducerSlice
  }
})