import React, { useState } from 'react';
import { Dollars } from '../';
import { Trades } from './Trades';

export const DetailButton = ({ doToggle, isDetailVisible }) => {
  const label = isDetailVisible ? 'hide details' : 'show details';
  return (
    <div className="more-link" onClick={doToggle}>
      {label}
    </div>
  );
};

export const MoreDetails = ({ transaction, isDetailVisible }) => {
  const {
    results: {
      contributions,
      positions,
      fees,
      cash: { cad: cashCAD, usd: cashUSD },
      totals: { cad: totalCAD, usd: totalUSD },
      holdings: { cad: holdingsCAD, usd: holdingsUSD },
    },
  } = transaction;
  return isDetailVisible ? (
    <div className="more-detail">
      <span>Portfolio totals as of this transaction are:</span>
      <TransactionCardRow label="contributions (CAD)" value={contributions} type="dollars" />
      <TransactionCardRow label="cash (CAD)" value={cashCAD} type="dollars" />
      <TransactionCardRow label="cash (USD)" value={cashUSD} type="dollars" />
      <TransactionCardRow label="holdings (CAD)" value={holdingsCAD} type="dollars" />
      <TransactionCardRow label="holdings (USD)" value={holdingsUSD} type="dollars" />
      <TransactionCardRow label="cash + holdings (CAD)" value={totalCAD} type="dollars" />
      <TransactionCardRow label="cash + holdings (USD)" value={totalUSD} type="dollars" />
      <TransactionCardRow label="fees" value={fees} type="dollars" />
      <div className="card-row-title positions">positions:</div>
      {Object.keys(positions).map(symbol => (
        <TransactionCardRow key={`${symbol}-position`} label={symbol} value={positions[symbol]} />
      ))}
    </div>
  ) : null;
};

export const TransactionCardRow = ({ label, value, type }) => {
  return value === 0 || value === '' ? null : (
    <div className="card-row">
      <span className="card-row-title">{label}: </span>
      {type === 'dollars' ? <Dollars value={value} /> : <span>{value}</span>}
    </div>
  );
};

export const TransactionCard = ({ transaction }) => {
  const [isDetailVisible, setShowDetail] = useState(false);
  const toggle = () => setShowDetail(!isDetailVisible);
  const {
    cash = {},
    holdings = {},
    trades = [],
    meta: { date, type, note = '', fee },
  } = transaction;
  const { usd: cashusd = 0, cad: cashcad = 0 } = cash;
  const { usd: holdingsusd = 0, cad: holdingscad = 0 } = holdings;
  return (
    <div className="transaction-card">
      <TransactionCardRow label="date" value={date} />
      <TransactionCardRow label="type" value={type} />
      <TransactionCardRow label="cash adjust (CAD)" value={cashcad} type="dollars" />
      <TransactionCardRow label="cash adjust (USD)" value={cashusd} type="dollars" />
      <TransactionCardRow label="holdings adjust (CAD)" value={holdingscad} type="dollars" />
      <TransactionCardRow label="holdings adjust (USD)" value={holdingsusd} type="dollars" />
      <TransactionCardRow label="fee" value={fee} type="dollars" />
      <TransactionCardRow label="notes" value={note} />
      {trades.length ? <Trades trades={trades} /> : null}
      <MoreDetails transaction={transaction} isDetailVisible={isDetailVisible} />
      <DetailButton isDetailVisible={isDetailVisible} doToggle={toggle} />
    </div>
  );
};
