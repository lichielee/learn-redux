import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './overview/App';
// import App from './async/App';
import App from './crud/App';

// import store from './overview/redux/store';
// import store from './async/redux/store';
import store from './crud/redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals