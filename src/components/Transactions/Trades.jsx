import React from 'react';

const TradeRow = ({ trade: { symbol, units, price } }) => {
  const formatted = `${units}@$${price}`;
  return (
    <div className="card-row">
      <span className="card-row-title">{symbol}</span>
      <span className="value">{formatted}</span>
    </div>
  );
};

export const Trades = ({ trades }) => {
  return (
    <div className="trades">
      <div className="is-centered primary bottom-margin">trades</div>
      {trades.map(trade => (
        <TradeRow key={trade.symbol} trade={trade} />
      ))}
    </div>
  );
};
