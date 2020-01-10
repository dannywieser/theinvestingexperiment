export const transactions = [
  {
    date: '2020-01-01',
    type: 'start',
    cash: {
      cad: 150,
    },
  },
  {
    date: '2020-01-02',
    type: 'contribute',
    cash: {
      cad: 300,
    },
  },
  {
    date: '2020-01-03',
    type: 'buy',
    cash: {
      cad: -300,
    },
    holdings: {
      cad: 295,
    },
    fee: 5,
    note: 'AAPL 60@271.48',
  },
];
