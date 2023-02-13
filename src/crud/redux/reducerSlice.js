import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//createApi在本质上，与createSlice是一样的，都是创建一个state的片段
const counterApi = createApi({
  //reducerPath定义了此片段在state中的key值，以及action的前缀名
  reducerPath: 'counterApiKey',
  baseQuery: fetchBaseQuery({
    baseUrl: '/'
  }),
  endpoints(build) {
    return {
      getCounter: build.query({
        //queryFn中，异步或者同步返回的结果必须是{data:XXXXXX}格式的
        query: (arg)=>{//如果arg不存在，hook的pollingInterval设置将不会生效
          console.log("query arg", arg)
          return "/counter.json"
        },
        // queryFn: ()=>{
        //   return new Promise(function(resolve, reject) {
        //     console.log("dddddd")
        //     resolve({data: 1000});
        //   })
        // },
        //transformResponse只能转换query的返回结果，不能转换queryFn的返回结果
        transformResponse: (response, meta, arg) => {
          console.log("response", response)
          return response.data;
        }
      })
    }
  }
})

export const {useGetCounterQuery} = counterApi

export default counterApi