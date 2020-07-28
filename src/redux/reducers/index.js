import { combineReducers } from 'redux';

import filters from './filters';
import sushi from './sushi';
import cart from './cart';

const rootReducer = combineReducers({
  filters,
  sushi,
  cart,
});

export default rootReducer;
