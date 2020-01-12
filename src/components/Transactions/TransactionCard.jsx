import React, { useState } from 'react';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { Dollars, Card } from '../';
import { Trades } from './Trades';

export const SummaryDate = ({ date }) => (
  <div className="transaction-date">{`${date.format('YY.MM.DD')}`}</div>
);

export const DetailButton = ({ doToggle, isDetailVisible }) => (
  <div className="more-link" onClick={doToggle}>
    {isDetailVisible ? <ExpandLess /> : <ExpandMore />}
  </div>
);

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
      <span className="card-row-title">{label} </span>
      {type === 'dollars' ? <Dollars value={value} /> : <span className="value">{value}</span>}
    </div>
  );
};

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
      <DetailButton isDetailVisible={false} doToggle={() => nul} />
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

const summaryMap = {
  start: StartSummary,
  contribute: ContributeSummary,
};

export const Summary = ({ transaction, isDetailVisible, toggle }) => {
  const {
    meta: { type, date },
  } = transaction;
  const SummaryComponent = summaryMap[type];
  return (
    <div className="summary">
      <SummaryDate date={date} />
      <SummaryComponent transaction={transaction} />
      <div>
        <DetailButton isDetailVisible={isDetailVisible} doToggle={toggle} />
      </div>
    </div>
  );
};

export const FullDetail = ({ transaction }) => {
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
      <div class="full-detail">
        <TransactionCardRow label="cash adjust (CAD)" value={cashcad} type="dollars" />
        <TransactionCardRow label="cash adjust (USD)" value={cashusd} type="dollars" />
        <TransactionCardRow label="holdings adjust (CAD)" value={holdingscad} type="dollars" />
        <TransactionCardRow label="holdings adjust (USD)" value={holdingsusd} type="dollars" />
        <TransactionCardRow label="fee" value={fee} type="dollars" />
        <TransactionCardRow label="notes" value={note} />
      </div>
      {trades.length ? (
        <div class="full-detail">
          <Trades trades={trades} />
        </div>
      ) : null}
    </div>
  );
};

export const TransactionCard = ({ transaction }) => {
  const [isDetailVisible, setShowDetail] = useState(false);
  const toggle = () => setShowDetail(!isDetailVisible);

  return (
    <Card>
      <Summary transaction={transaction} isDetailVisible={isDetailVisible} toggle={toggle} />
      {isDetailVisible ? <FullDetail transaction={transaction} /> : null}
    </Card>
  );
};
