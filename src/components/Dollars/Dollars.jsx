import React from 'react';
import classNames from 'classnames';
import './dollars.css';

const isNegative = value => value < 0;

export const Dollars = ({ value, style = 'accounting' }) => {
  let fmtValue = value.toFixed(2);
  if (isNegative(value)) {
    fmtValue = fmtValue * -1;
  }
  const mainClasses = classNames('dollars', { negative: value < 0 }, style);
  const valueClasses = classNames(style);

  return (
    <span className={mainClasses}>
      <span className="symbol">$</span>

      <span className={valueClasses}>
        {isNegative(value) ? '(' : ''}
        {fmtValue}
        {isNegative(value) ? ')' : ''}
      </span>
    </span>
  );
};
