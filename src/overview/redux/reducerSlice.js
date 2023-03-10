import { createSlice } from '@reduxjs/toolkit'

//createSlice生成了一个state片段，以及相对应的reducer和action
export const functionReducerSlice = createSlice({
  //name定义了action type的前缀,
  //整个action type是由name和reducers中的key合并起来的
  //在本例中，increment的action type是"actionTypePrefix/increment"
  //decrement的action type是"actionTypePrefix/decrement"
  name: 'actionTypePrefix',
  initialState: {
    //初始的状态值
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的不可变的状态
      // 传入参数state并不是store中的state，而是store中的state的切片（一部分），具体的对应关系在store.js有说明
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    }
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, decrement } = functionReducerSlice.actions

export default functionReducerSlice.reducer