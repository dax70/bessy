import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import getSeatData from './data/seatData';

const seats = getSeatData();

const defaultState = {
  seats
}

const store = createStore(rootReducer, defaultState);

export default store;
