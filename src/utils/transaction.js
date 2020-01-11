const uuidv4 = require('uuid/v4');

import { loadExchange } from './loader';

const startPortfolio = {
  contributions: 0,
  cash: {
    cad: 0,
    usd: 0,
  },
  holdings: {
    cad: 0,
    usd: 0,
  },
  total: {
    cad: 0,
    usd: 0,
  },
  positions: {},
};

const buildMeta = ({ date, type, fee = 0, note, exchange }) => ({
  date,
  type,
  fee,
  note,
  uuid: uuidv4(),
  exchange,
});

function adjustCash(transaction, portfolio) {
  const { cash = {} } = transaction;
  const { usd = 0, cad = 0 } = cash;
  return {
    cad: portfolio.cash.cad + cad,
    usd: portfolio.cash.usd + usd,
  };
}

function adjustHoldings(transaction, portfolio) {
  const { holdings = {} } = transaction;
  const { usd = 0, cad = 0 } = holdings;
  return {
    cad: portfolio.holdings.cad + cad,
    usd: portfolio.holdings.usd + usd,
  };
}

function adjustPositions(transaction, portfolio) {
  const { positions = {} } = portfolio;
  const { trades = [] } = transaction;
  return trades.reduce((newPositions, { symbol, units }) => {
    const existing = positions[symbol] ? positions[symbol] : { units: 0 };
    const newUnits = existing.units + units;
    return { ...newPositions, [symbol]: newUnits };
  }, positions);
}

function updatePortfolio(transaction, contributions, portfolio) {
  const cash = adjustCash(transaction, portfolio);
  const holdings = adjustHoldings(transaction, portfolio);
  const totals = calcTotals(cash, holdings, transaction.exchange);
  const positions = adjustPositions(transaction, portfolio);
  return {
    ...portfolio,
    contributions,
    cash,
    holdings,
    totals,
    positions,
  };
}

function updateContributions(transaction, portfolio) {
  const { type, cash, contributions = 0 } = transaction;
  if (type === 'contribute') {
    return portfolio.contributions + cash['cad'];
  }
  if (type === 'start' && contributions > 0) {
    return contributions;
  }
}

function adjust(transaction, portfolio = startPortfolio) {
  const { cash, holdings, trades } = transaction;
  const contributions = updateContributions(transaction, portfolio);
  const results = updatePortfolio(transaction, contributions, portfolio);
  const meta = buildMeta(transaction);
  return { meta, cash, holdings, trades, results };
}

function calcTotals(cash, holdings, exchange) {
  const cad = (cash.cad + cash.usd * exchange + holdings.cad + holdings.usd * exchange).toFixed(2);
  const usd = (cash.cad / exchange + cash.usd + holdings.cad / exchange + holdings.usd).toFixed(2);
  return { cad, usd };
}

export function loadTransactionExchange(transactions) {
  return Promise.all(
    transactions.map(async toprocess => {
      const exchange = await loadExchange(toprocess.date);
      return { ...toprocess, exchange };
    }),
  );
}

export function processTransactions(transactions) {
  let state;
  return transactions.map(toprocess => {
    const transaction = adjust(toprocess, state);
    state = { ...transaction.result };
    return transaction;
  });
}
