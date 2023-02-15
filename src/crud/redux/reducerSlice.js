import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// createApi在本质上，与createSlice是一样的，都是创建一个state的片段
// 区别是，createSlice的重点在于自定义state，action和reducer之间的对应关系
// createApi则是自动创建数据操作（CRUD）的state，以及对应action和reducer之间的对应关系
// createApi的重点在于管理数据操作的状态，也提供了数据转换，缓存，轮询，错误处理等功能
const counterApi = createApi({
  // reducerPath定义了此片段在state中的key值，以及action的前缀名
  reducerPath: 'counterApiKey',
  // baseQuery是真正执行查询的地方，endpoints中定义的query，只是将查询选项传递给baseQuery
  // baseQuery默认使用fetchBaseQuery，也可以自定义
  baseQuery: (args, {signal, dispatch, getState}, extraOptions)=>{
    console.log("args", args)
    // return {"data": {"data": 666}}
    return new Promise(function(resolve, reject) {
        resolve({"data": {"data": 666666}});
    })
  },
  // baseQuery: fetchBaseQuery({
  //   baseUrl: '/'
  // }),
  endpoints(build) {
    return {
      //state中的状态的json path，需要由"getCounter"和"build.query"共同决定
      //此例中，state中的状态的json path是counterApiKey--queries--getCounter
      getCounter: build.query({
        query: (arg)=>{//如果arg不存在，hook的pollingInterval设置将不会生效
          console.log("query arg", arg)
          return "/counter.json"
        },
        //queryFn中，异步或者同步返回的结果必须是{data:XXXXXX}格式的
        // queryFn: ()=>{
        //   return new Promise(function(resolve, reject) {
        //     resolve({data: 1000});
        //   })
        // },
        //transformResponse只能转换query的返回结果，不能转换queryFn的返回结果
        transformResponse: (response, meta, arg) => {
          return response.data;
        },
        // RTK使用queryCacheKey唯一的标识一个缓存记录，queryCacheKey = endpoint + parameter
        // tag仅仅是对缓存做了一个标签
        // tag可以是字符串，也可以是"{type: string, id?: string|number}"形式的对象
        // RTK将tag为类型处理，每个类型有不同实例时，用id区分
        // 不同的endpoints之间的providesTags是没有任何关系的，即使他们完全一样
        providesTags: (result, error, queryArg) => {
          return [{ type: 'counter', data: result }];
        },
        onQueryStarted(
            arg,
            {
              dispatch,
              getState,
              extra,
              requestId,
              queryFulfilled,
              getCacheEntry,
              updateCachedData,
            }
        ) {
          console.log("query start", getCacheEntry())
        }
      }),


      updateCounter: build.mutation({
        query(data) {
          return {
            url: "/counter.json",
            //因无服务器，所以使用GET方法模拟POST
            method: 'GET',
          }
        },
        transformResponse: (response, meta, arg) => {
          return 9;
        },
        // 类型失效时，所有实例都失效
        // 比如：invalidate {type: "A"}, 所有{type: "A"}和{type: "A", id:"XXX"}都失效
        // 实例失效时，只针对该实例
        // 比如：invalidate {type: "A", id;"1"}, 只有包含{type: "A", id;"1"}的缓存失效
        // 只有{type: "A"}或者{type: "A", id;"2"}的缓存继续有效
        // 如果返回结果是数组，那么数组的每个元素有自己单独的tag

        // 清除缓存的时机：
        // 1. 引用计数为0，且到达过期时间
        // 2. 触发invalid tag
        // 3. 手动调用refetch
        invalidatesTags: (result, error, queryArg) => {
          return [{ type: 'counter', data: result }];
        },
      }),
    }
  }
})

export const {endpoints} = counterApi

export default counterApi