import React, { useState } from 'react';

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
      cash: { cad: cashCAD, usd: cashUSD },
      totals: { cad: totalCAD, usd: totalUSD },
      holdings: { cad: holdingsCAD, usd: holdingsUSD },
    },
  } = transaction;
  return isDetailVisible ? (
    <div className="more-detail">
      <TransactionCardRow label="total contributions (CAD)" value={contributions} type="dollars" />
      <TransactionCardRow label="total cash (CAD)" value={cashCAD} type="dollars" />
      <TransactionCardRow label="total cash (USD)" value={cashUSD} type="dollars" />
      <TransactionCardRow label="total holdings (CAD)" value={holdingsCAD} type="dollars" />
      <TransactionCardRow label="total holdings (USD)" value={holdingsUSD} type="dollars" />
      <TransactionCardRow label="book value (CAD)" value={totalCAD} type="dollars" />
      <TransactionCardRow label="book value (USD)" value={totalUSD} type="dollars" />
    </div>
  ) : null;
};

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
  const [isDetailVisible, setShowDetail] = useState(false);
  const toggle = () => setShowDetail(!isDetailVisible);
  const {
    cash = {},
    holdings = {},
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
      <MoreDetails transaction={transaction} isDetailVisible={isDetailVisible} />
      <DetailButton isDetailVisible={isDetailVisible} doToggle={toggle} />
    </div>
  );
};
