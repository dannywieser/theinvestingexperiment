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

function updatePortfolio(transaction, contributions, portfolio) {
  const cash = adjustCash(transaction, portfolio),
  const holdings = adjustHoldings(transaction, portfolio),
  const totals = calcTotals(portfolio),
  const contributions =
  portfolio = {
    ...portfolio,
    contributions,
    cash,
    holdings,
    totals,
  };
}

function contribute(transaction, portfolio = startPortfolio) {
  const { cash, holdings } = transaction;
  const contributions = portfolio.contributions + transaction.cash['cad'];
  const results = updatePortfolio(transaction, contributions, portfolioIn);
  return  { meta: buildMeta(transaction), cash, holdings, results }
}

function start(transaction, portfolio = startPortfolio) {
  const { cash, holdings } = transaction;
  const results = updatePortfolio(transaction, transaction.contributions, portfolio);
  const meta = buildMeta(transaction);
  return { meta, cash, holdings, results };
}

function buy(transaction, portfolio = startPortfolio) {
  const { cash, holdings } = transaction;
  const results = updatePortfolio(transaction, portfolio.contributions, portfolio);
  const meta = buildMeta(transaction);
  return { meta, cash, holdings, results };
}

function adjust(transaction, portfolio = startPortfolio) {
  const { cash } = transaction;
  const portfolio = updatePortfolio(transaction, portfolio.contributions, portfolio);
  const meta = buildMeta(transaction);
  return { meta: buildMeta(transaction), cash, holdings, results: portfolio };
}
const conversion = adjust;
const dividend = adjust;

async function loadExchange(date) {
  const response = await fetch(`https://api.exchangeratesapi.io/${date}?symbols=CAD&base=USD`);
  const json = await response.json();
  const {
    rates: { CAD },
  } = json;
  console.log('return exchange');
  return CAD;
}

function calcTotals(portfolio) {
  const { exchange, cash = {} } = transaction;
  const { cash, holdings };
  const cad = cash.cad + (cash.usd * exchange) + holdings.cad + (holdings.usd * exchange);
  const usd = (cash.cad / exchange) + cash.usd + (holdings.cad / exchange) + holdings.usd;
  return { cad, usd };
}

const handlerMap = {
  buy,
  contribute,
  conversion,
  dividend,
  start,
};

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
    const { portfolio, transaction } = handlerMap[toprocess.type](toprocess, state);
    state = { ...portfolio };
    return transaction;
  });
}
