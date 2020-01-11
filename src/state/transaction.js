import { processTransactions, loadTransactionExchange } from '../utils';

const DEFAULT_STATE = {
  transactions: [],
};

export function loadTransactions(account) {
  return async dispatch => {
    const dataUrl = `/data/${account}.json`;
    console.log('load', dataUrl);
    const response = await fetch(dataUrl);
    const transactions = await response.json();
    const withExchange = await loadTransactionExchange(transactions);
    const payload = processTransactions(withExchange);
    dispatch({ account, payload, type: 'LOAD_TRANSACTIONS.complete' });
  };
}

export function transaction(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'LOAD_TRANSACTIONS.complete':
      const { transactions } = state;
      return {
        transactions: {
          ...transactions,
          [action.account]: action.payload,
        },
      };
    default:
      return state;
  }
}
