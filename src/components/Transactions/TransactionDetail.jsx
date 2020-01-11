import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadTransactions } from '../../state/';
import { TransactionCard } from './TransactionCard';
import './transactions.css';

const getAccount = ({
  match: {
    params: { account },
  },
}) => account;

const transactionsForAccount = (account, { transactions = {} }) =>
  transactions[account] ? transactions[account] : [];

export class TransactionDetailBase extends React.Component {
  componentDidMount() {
    const { loadTransactions } = this.props;
    const account = getAccount(this.props);
    const accountTransactions = transactionsForAccount(account, this.props);
    if (accountTransactions.length === 0) {
      loadTransactions(account);
    }
  }

  componentDidUpdate(prevProps) {
    const { loadTransactions } = this.props;
    const account = getAccount(this.props);
    const accountTransactions = transactionsForAccount(account, this.props);
    if (account !== getAccount(prevProps) && accountTransactions.length === 0) {
      loadTransactions(getAccount(this.props));
    }
  }

  render() {
    const accountTransactions = transactionsForAccount(getAccount(this.props), this.props);

    return (
      <div className="transactions">
        {accountTransactions.map(transaction => (
          <TransactionCard key={transaction.meta.uuid} transaction={transaction} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions,
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: bindActionCreators(loadTransactions, dispatch),
});

export const TransactionDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionDetailBase);
