import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import "./components/pushNotification/messaging_get_token";

import socketio from 'socket.io-client';
import { baseUrl } from "./axios";


const socket = socketio.connect(baseUrl, {
  cors: { origin: "*" }
});


ReactDOM.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
