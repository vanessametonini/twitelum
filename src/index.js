import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from 'react-redux';
import { store } from 'store';

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/novoTweet.css'

//para importar o CSS dos components depois dos globais
import Roteamento from "./routes";

ReactDOM.render(
  <Provider store={store}><BrowserRouter><Roteamento /></BrowserRouter></Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
