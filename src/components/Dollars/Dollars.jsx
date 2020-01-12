import React from 'react';
import './dollars.css';

const isNegative = value => value < 0;

export const Dollars = ({ value }) => {
  let fmtValue = value.toFixed(2);
  if (isNegative(value)) {
    fmtValue = fmtValue * -1;
  }
  const classes = value < 0 ? 'negative' : '';
  return (
    <span className={`dollars ${classes}`}>
      <span className="symbol">$</span>

      <span className="value">
        {isNegative(value) ? '(' : ''}
        {fmtValue}
        {isNegative(value) ? ')' : ''}
      </span>
    </span>
  );
};
