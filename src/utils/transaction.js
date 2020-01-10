const uuidv4 = require('uuid/v4');

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
};

function buildMeta({ date, type, fee = 0, note }) {
  return { date, type, fee, note, uuid: uuidv4() };
}

function adjustCash(transaction, portfolio) {
  const {
    cash: { usd = 0, cad = 0 },
  } = transaction;
  return {
    cad: portfolio.cash.cad + cad,
    usd: portfolio.cash.usd + usd,
  };
}

function adjustHoldings(transaction, portfolio) {
  const {
    holdings: { usd = 0, cad = 0 },
  } = transaction;
  return {
    cad: portfolio.holdings.cad + cad,
    usd: portfolio.holdings.usd + usd,
  };
}

function contribute(transaction, portfolio = startPortfolio) {
  const { cash, holdings } = transaction;
  portfolio = {
    ...portfolio,
    contributions: portfolio.contributions + transaction.cash['cad'],
    cash: adjustCash(transaction, portfolio),
  };
  return {
    portfolio,
    transaction: { meta: buildMeta(transaction), cash, holdings, results: portfolio },
  };
}
const start = contribute;

function buy(transaction, portfolio = startPortfolio) {
  const { cash, holdings } = transaction;
  portfolio = {
    ...portfolio,
    cash: adjustCash(transaction, portfolio),
    holdings: adjustHoldings(transaction, portfolio),
  };
  return {
    portfolio,
    transaction: { meta: buildMeta(transaction), cash, holdings, results: portfolio },
  };
}

function adjust(transaction, portfolio = startPortfolio) {
  const { cash } = transaction;
  portfolio = {
    ...portfolio,
    cash: adjustCash(transaction, portfolio),
  };
  return {
    portfolio,
    transaction: { meta: buildMeta(transaction), cash, holdings, results: portfolio },
  };
}
const conversion = adjust;
const dividend = adjust;

const handlerMap = {
  buy,
  contribute,
  conversion,
  dividend,
  start,
};

export function processTransactions(transactions) {
  let state;
  return transactions.map(toprocess => {
    const { portfolio, transaction } = handlerMap[toprocess.type](toprocess, state);
    state = { ...portfolio };
    return transaction;
  });
}
