import React from 'react';
import ReactDOM from 'react-dom';
import './App/index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom'
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
