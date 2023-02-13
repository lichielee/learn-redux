import './App.css';

// import { useSelector, useDispatch } from 'react-redux'
import { useGetCounterQuery } from './redux/reducerSlice'

function App() {
  const {data, isSuccess, isLoading, isError} = useGetCounterQuery(100,{
    //!!!useGetCounterQuery中，必须向query方法传递参数，pollingInterval才会生效!!!
    pollingInterval: 3000,
  });

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="App-link"
        >
          Function value: {data}
        </div>

        <button
          style={{marginTop: 50}}
          // onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <button
          style={{marginTop: 50}}
          // onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </header>
    </div>
  );
}

export default App;
