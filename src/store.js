import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import getSeatData from './data/seatData';

const seatMapData = getSeatData();

const defaultState = {
  seatMapData
}

cons store = createStore(rootReducer, defaultState);

export default store;
