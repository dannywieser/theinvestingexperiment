import { loadExchange } from './loader';

const uuidv4 = require('uuid/v4');
const moment = require('moment');

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
    fees: 0,
  },
  positions: {},
};

const buildMeta = ({ date, type, fee = 0, note, exchange }) => ({
  date: moment(date),
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
    const existing = positions[symbol] ? positions[symbol] : 0;
    const newUnits = existing + units;
    return { ...newPositions, [symbol]: newUnits };
  }, positions);
}

function calcTotals(cash, holdings, exchange) {
  const cad = cash.cad + cash.usd * exchange + holdings.cad + holdings.usd * exchange;
  const usd = cash.cad / exchange + cash.usd + holdings.cad / exchange + holdings.usd;
  return { cad, usd };
}

function updatePortfolio(transaction, contributions, portfolio) {
  const { fee = 0 } = transaction;
  const { fees = 0 } = portfolio;
  const updatedFees = fees + fee;
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
    fees: updatedFees,
  };
}

function updateContributions(transaction, portfolio) {
  const { type, cash, contributions = 0 } = transaction;
  if (type === 'contribute') {
    return portfolio.contributions + cash.cad;
  }
  if (type === 'start' && contributions > 0) {
    return contributions;
  }
  return portfolio.contributions;
}

function adjust(transaction, portfolio = startPortfolio) {
  const { cash, holdings, trades } = transaction;
  const contributions = updateContributions(transaction, portfolio);
  const results = updatePortfolio(transaction, contributions, portfolio);
  const meta = buildMeta(transaction);
  return { meta, cash, holdings, trades, results };
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
  const processed = transactions.map(toprocess => {
    const transaction = adjust(toprocess, state);
    state = { ...transaction.results };
    return transaction;
  });
  processed.sort(
    ({ meta: { date: dateA } }, { meta: { date: dateB } }) => dateB.valueOf() - dateA.valueOf(),
  );
  return processed;
}
