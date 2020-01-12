import React from 'react';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import { Dollars } from '../Dollars';

export const StartSummary = ({ transaction }) => {
  const {
    results: {
      totals: { cad },
    },
  } = transaction;
  return (
    <div>
      <strong>start|portfolio total (CAD)</strong>
      <Dollars value={cad} />
    </div>
  );
};

export const BuySummary = ({ transaction }) => {
  const {
    holdings: { cad: holdingsCAD = 0, usd: holdingsUSD = 0 },
    trades,
  } = transaction;
  const label = holdingsCAD > 0 ? 'holdings change(CAD)' : 'holdings change(USD)';
  const tradesSummary = trades.reduce(
    (summary, { symbol, units }) =>
      summary === '' ? `${symbol}(${units})` : `${summary}, ${symbol}(${units})`,
    '',
  );
  return (
    <div>
      <strong>
        {`buy|${label}`}|{tradesSummary}
      </strong>
      {holdingsCAD > 0 ? <Dollars value={holdingsCAD} /> : null}
      {holdingsUSD > 0 ? <Dollars value={holdingsUSD} /> : null}
    </div>
  );
};

export const ContributeSummary = ({ transaction }) => {
  const {
    cash: { cad },
  } = transaction;
  return (
    <div>
      <strong>contribute|amount (CAD)</strong>
      <Dollars value={cad} />
    </div>
  );
};

export const DividendSummary = ({ transaction }) => {
  const {
    cash: { cad, usd },
  } = transaction;
  const label = cad > 0 ? 'amount(CAD)' : 'amount(USD)';
  return (
    <div>
      <strong>{`dividend|${label}`}</strong>
      {cad > 0 ? <Dollars value={cad} /> : null}
      {usd > 0 ? <Dollars value={usd} /> : null}
    </div>
  );
};

export const FeeSummary = ({ transaction }) => {
  const {
    meta: { fee },
  } = transaction;
  const label = fee > 0 ? 'amount(CAD)' : 'amount(USD)';
  return (
    <div>
      <strong>{`fee|${label}`}</strong>
      <Dollars value={fee} />
    </div>
  );
};

const summaryMap = {
  start: StartSummary,
  contribute: ContributeSummary,
  buy: BuySummary,
  dividend: DividendSummary,
  fee: FeeSummary,
};

export const TransactionSummary = ({ transaction, isDetailVisible, toggle }) => {
  const {
    meta: { type, date },
  } = transaction;
  const SummaryComponent = summaryMap[type];
  return (
    <div className="summary">
      <div className="transaction-date">{`${date.format('YY.MM.DD')}`}</div>
      <SummaryComponent transaction={transaction} />
      <div className="more-link" onClick={toggle}>
        {isDetailVisible ? <ExpandLess /> : <ExpandMore />}
      </div>
    </div>
  );
};
