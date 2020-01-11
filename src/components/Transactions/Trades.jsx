import React from 'react';

const TradeRow = ({ trade: { symbol, units, price } }) => {
  const formatted = `${units}@$${price}`;
  return (
    <div className="card-row">
      <span className="card-row-title">{symbol}</span>
      <span>{formatted}</span>
    </div>
  );
};

export const Trades = ({ trades }) => {
  return (
    <div className="trades">
      <span className="card-row-title ">trades:</span>
      {trades.map(trade => (
        <TradeRow key={trade.symbol} trade={trade} />
      ))}
    </div>
  );
};
