import { processTransactions, loadTransactionExchange } from '../utils';

const DEFAULT_STATE = {
  transactions: [],
};

export function loadTransactions(data) {
  return async dispatch => {
    const response = await fetch(data);
    const transactions = await response.json();
    const withExchange = await loadTransactionExchange(transactions);
    console.log('after 1', withExchange);
    const payload = processTransactions(withExchange);
    console.log('after process', payload);
    dispatch({ payload, type: 'LOAD_TRANSACTIONS.complete' });
  };
}

export function transaction(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'LOAD_TRANSACTIONS.complete':
      return {
        transactions: action.payload,
      };
    default:
      return state;
  }
}
