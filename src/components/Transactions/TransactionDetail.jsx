import React from 'react';
import { useParams } from 'react-router-dom';
import { processTransactions } from '../../utils';
import data from '../../data';
import './transactions.css';

export const TransactionCardRow = ({ label, value, type }) => {
  let fmtValue = value;
  let typeClasses = '';
  if (type === 'dollars') {
    typeClasses = value < 0 ? `${type} negative` : `${type}`;
    fmtValue = `$${Math.abs(value)}`;
  }
  return value === 0 || value === '' ? null : (
    <div className="card-row">
      <span className="card-row-title">{label}: </span>
      <span className={typeClasses}>{fmtValue}</span>
    </div>
  );
};

export const TransactionCard = ({ transaction }) => {
  const {
    cash = {},
    holdings = {},
    meta: { date, type, note = '' },
  } = transaction;
  const { usd: cashusd = 0, cad: cashcad = 0 } = cash;
  const { usd: holdingsusd = 0, cad: holdingscad = 0 } = holdings;
  console.log(transaction);
  return (
    <div className="transaction-card">
      <TransactionCardRow label="date" value={date} />
      <TransactionCardRow label="type" value={type} />
      <TransactionCardRow label="Cash Adjust (CAD)" value={cashcad} type="dollars" />
      <TransactionCardRow label="Cash Adjust (USD)" value={cashusd} type="dollars" />
      <TransactionCardRow label="Holdings Adjust (CAD)" value={holdingscad} type="dollars" />
      <TransactionCardRow label="Holdings Adjust (USD)" value={holdingsusd} type="dollars" />
      <TransactionCardRow label="Fee" value={holdingsusd} type="dollars" />
      <TransactionCardRow label="Note" value={note} />
    </div>
  );
};

export const TransactionDetail = () => {
  const { account } = useParams();
  const processed = processTransactions(data[account].transactions);
  return (
    <div className="transactions">
      {processed.map(transaction => (
        <TransactionCard key={transaction.meta.uuid} transaction={transaction} />
      ))}
    </div>
  );
};
