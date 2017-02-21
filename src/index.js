import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import store from './store';

import getSeatData from './data/seatData';

const seatMapData = getSeatData();

const app = (
  <Provider store={store} >
    <App seatMapData={seatMapData}/>
  </Provider>
)

render(
  app,
  document.getElementById('root')
);
