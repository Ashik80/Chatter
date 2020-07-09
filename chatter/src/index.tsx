import React from 'react';
import ReactDOM from 'react-dom';
import './App/index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
