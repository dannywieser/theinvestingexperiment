import React, { useState } from 'react';

import { Dollars, Card } from '../';
import { Trades } from './Trades';
import { TransactionSummary } from './TransactionSummary';

export const PortfolioDetail = ({ transaction }) => {
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
  return (
    <div>
      <div className="transaction-section">
        <div className="is-centered primary">portfolio</div>
        <TransactionCardRow label="contributions (CAD)" value={contributions} type="dollars" />
        <TransactionCardRow label="cash (CAD)" value={cashCAD} type="dollars" />
        <TransactionCardRow label="cash (USD)" value={cashUSD} type="dollars" />
        <TransactionCardRow label="holdings (CAD)" value={holdingsCAD} type="dollars" />
        <TransactionCardRow label="holdings (USD)" value={holdingsUSD} type="dollars" />
        <TransactionCardRow label="cash + holdings (CAD)" value={totalCAD} type="dollars" />
        <TransactionCardRow label="cash + holdings (USD)" value={totalUSD} type="dollars" />
        <TransactionCardRow label="fees" value={fees} type="dollars" />
      </div>
      <div className="transaction-section">
        <div className="is-centered primary">positions</div>
        {Object.keys(positions).map(symbol => (
          <TransactionCardRow
            key={`${symbol}-position`}
            label={symbol}
            value={positions[symbol].toFixed(4)}
          />
        ))}
      </div>
    </div>
  );
};

export const TransactionCardRow = ({ label, value, type }) => {
  return value === 0 || value === '' ? null : (
    <div className="card-row">
      <span className="card-row-title">{label} </span>
      {type === 'dollars' ? <Dollars value={value} /> : <span className="value">{value}</span>}
    </div>
  );
};

export const TransactionFullDetails = ({ transaction }) => {
  const {
    cash = {},
    holdings = {},
    trades = [],
    meta: { note = '', fee },
  } = transaction;
  const { usd: cashusd = 0, cad: cashcad = 0 } = cash;
  const { usd: holdingsusd = 0, cad: holdingscad = 0 } = holdings;
  return (
    <div>
      <div className="transaction-section">
        <TransactionCardRow label="cash adjust (CAD)" value={cashcad} type="dollars" />
        <TransactionCardRow label="cash adjust (USD)" value={cashusd} type="dollars" />
        <TransactionCardRow label="holdings adjust (CAD)" value={holdingscad} type="dollars" />
        <TransactionCardRow label="holdings adjust (USD)" value={holdingsusd} type="dollars" />
        <TransactionCardRow label="fee" value={fee} type="dollars" />
        <TransactionCardRow label="notes" value={note} />
      </div>
      {trades.length ? (
        <div className="transaction-section">
          <Trades trades={trades} />
        </div>
      ) : null}
      <PortfolioDetail transaction={transaction} />
    </div>
  );
};

export const TransactionCard = ({ transaction }) => {
  const [isDetailVisible, setShowDetail] = useState(false);
  const toggle = () => setShowDetail(!isDetailVisible);
  return (
    <Card>
      <TransactionSummary
        transaction={transaction}
        isDetailVisible={isDetailVisible}
        toggle={toggle}
      />
      {isDetailVisible ? <TransactionFullDetails transaction={transaction} /> : null}
    </Card>
  );
};
