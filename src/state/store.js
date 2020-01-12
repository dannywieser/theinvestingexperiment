import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { transaction } from './transaction';

const middleware = compose(applyMiddleware(thunk));

// const middleware = compose(
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
// );

export default createStore(transaction, middleware);
