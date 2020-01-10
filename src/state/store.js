import { transaction } from './transaction';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const middleware = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
);

export const store = createStore(transaction, middleware);
