import React from 'react';
import { useParams } from 'react-router-dom';
import { loadJSON, processTransactions } from '../../utils';
import './transactions.css';

export const TransactionDetail = () => {
  let { account } = useParams();
  const transactions = loadJSON(`/data/${account}.json`);
  processTransactions(transactions);

  return (
    <div>
      <div>details</div>
    </div>
  );
};
