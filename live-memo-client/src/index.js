import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import socketio from 'socket.io-client';


const socket = socketio.connect('http://localhost:4000');


ReactDOM.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
