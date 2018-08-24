
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer.js';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  // ...options
});

const store = createStore(reducer,applyMiddleware(thunk,logger));

export default store;