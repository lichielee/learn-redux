import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
import { endpoints } from './redux/reducerSlice'

import './App.css';

const DataType = {
  queryData: "q",
  updateData: "u"
}
function App() {
  const [skip, setSkip] = useState(true);
  const [dataType, setDataType] = useState(true);

  const {data, isSuccess, isLoading, isError} = endpoints.getCounter.useQuery(100,{
    // useQuery会在组件挂载完成后，就会开始取数据。
    // 如果需要在指定的时刻再去取数据，需要在初始化的时候，设置skip为true
    skip,
    // !!!useQuery中，必须向query方法传递参数，pollingInterval才会生效!!!
    // 此例中，useQuery后的100就是传递的参数
    pollingInterval: 3000,
  });

  // useMutation与useQuery不同，在useMutation返回的对象是不同的实例
  // 如果需要useMutation返回相同的实例，需要在两次调用中使用相同的fixedCacheKey
  const [update, {data: updateData}] = endpoints.updateCounter.useMutation({
    //fixedCacheKey: 'shared-update-counter',
  });

  const displayData = dataType == DataType.queryData ? data : updateData;

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="App-link"
        >
          Function value: {displayData}
        </div>

        <button
          style={{marginTop: 50}}
          onClick={
            () => {
              setDataType(DataType.queryData)
              setSkip(!skip)
            }
          }
        >
          set skip {!skip ? "true" : "false"}
        </button>

        <button
          style={{marginTop: 50}}
          onClick={
            () => {
              setDataType(DataType.updateData)
              update()
            }
          }
        >
          Update Counter
        </button>
      </header>
    </div>
  );
}

export default App;
