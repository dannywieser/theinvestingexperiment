import { doAction } from './connect';

export function contribute({ type, contribution, currency }) {
  const transaction = {
    type,
    currency,
    amount: contribution,
    date: new Date(),
  };
  doAction('transactions', (collection, callback) => collection.insertOne(transaction, callback));
}
