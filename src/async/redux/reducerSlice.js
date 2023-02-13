import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const stateKey = "stateKey";

//createAsyncThunk的作用是提供一个异步函数
//此异步函数的作用是以异步的方式，向store发出一个action
export const asyncIncrement = createAsyncThunk(
  'asyncIncrement',
  async (data, store)=> {
    return await new Promise(function(resolve, reject) {
      setTimeout(()=>{
        // console.log("store", store);
        resolve(data);
      }, 1000)
    });
  }
);

export const functionReducerSlice = createSlice({
  //name定义了action type的前缀,
  //整个action type是由name和reducers中的key合并起来的
  //在本例中，increment的action type是"actionTypePrefix/increment"
  //decrement的action type是"actionTypePrefix/decrement"
  name: 'asyncActionPrefix',
  initialState: {
    //初始的状态值
    value: 0,
    isLoading: false
  },
  reducers: {
    increment: (state,action) => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的不可变的状态
      // 传入参数state并不是store中的state，而是store中的state的切片（一部分），具体的对应关系在store.js有说明
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    }
  },

  // extraReducers选项是一个接收名为builder的参数的函数。
  // builder对象提供了一些方法，
  // 让我们可以定义额外的reducer，这些reducer将响应在slice之外定义的action
  // 即不在createSlice的reducers属性中定义的reducer（也叫slice reducer）
  // 这些额外的reducer将与slice reducer一起处理同一个state片段。

  // 在createSlice的reducers属性中定义的reducer（也叫slice reducer），
  // action type是由name属性和reducers中的key值共同决定的
  //（比如本例中，increment的action type就是'asyncActionPrefix/increment'）
  // 而在extraReducers中定义reducers，action type直接由extraReducers的key值决定
  // （比如本例中，asyncIncrement.fulfilled的action type就是'asyncIncrement/fulfilled'）
  // 两者的主要区别在于action type的值是否可以自己定义
  extraReducers:{
    [asyncIncrement.fulfilled]: (state, action)=>{
      state.value += action.payload;
      state.isLoading = false;
    },
    [asyncIncrement.pending]: (state, action)=>{
      state.isLoading = true;
    },
    //自定义action type的处理
    "custom/actionType": (state, action)=>{
      state.value += 1000;
    }
  }
  //下面注释的这种写法，是另一种添加reducer的写法
  // extraReducers: (builder)=>{
  //   builder.addCase(asyncIncrement.fulfilled, (state, action)=>{
  //     state.value += action.payload;
  //   })
  // }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, decrement } = functionReducerSlice.actions

export default functionReducerSlice.reducer

