import './App.css';

import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, asyncIncrement } from './redux/reducerSlice';
import { getValue } from './redux/selector';

function App() {
  const countValue = useSelector(getValue);
  const dispatch = useDispatch()

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="App-link"
        >
          Function value: {countValue}
        </div>

        <button
          style={{marginTop: 50}}
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <button
          style={{marginTop: 50}}
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

        <button
          style={{marginTop: 50}}
          onClick={() => dispatch(asyncIncrement(100))}
        >
          Async Increment
        </button>

        <button
          style={{marginTop: 50}}
          onClick={() => dispatch({type: "custom/actionType"})}
        >
          Custom Increment
        </button>
      </header>
    </div>
  );
}

export default App;
