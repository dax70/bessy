import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

import getSeatData from './data/seatData';

const seatMapData = getSeatData();

render(
  <App seatMapData={seatMapData}/>,
  document.getElementById('root')
);
