import { createStore } from 'redux';
import rootReducer from './reducers';
import getSeatData from './data/seatData';

const seats = getSeatData();

const defaultState = {
  tiltEnabled: false,
  seats
}

const store = createStore(rootReducer, defaultState);

console.log(store.getState());

export default store;
