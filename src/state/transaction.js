import { processTransactions, loadTransactionExchange } from '../utils';

const DEFAULT_STATE = {
  transactions: [],
};

export function loadTransactions(data) {
  return async dispatch => {
    const response = await fetch(data);
    const transactions = await response.json();
    const withExchange = await loadTransactionExchange(transactions);
    const payload = processTransactions(withExchange);
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
