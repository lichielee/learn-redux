import './App.css';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/reducerSlice'

function App() {
  const countValue = useSelector(state => state.stateKey.value)
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
      </header>
    </div>
  );
}

export default App;
