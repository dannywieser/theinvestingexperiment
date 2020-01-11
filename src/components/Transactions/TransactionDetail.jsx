import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadTransactions } from '../../state/';
import { TransactionCard } from './TransactionCard';
import './transactions.css';

export class TransactionDetailBase extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { account },
      },
      loadTransactions,
    } = this.props;
    loadTransactions(`/data/${account}.json`);
  }

  render() {
    const { transactions } = this.props;
    return (
      <div className="transactions">
        {transactions.map(transaction => (
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
