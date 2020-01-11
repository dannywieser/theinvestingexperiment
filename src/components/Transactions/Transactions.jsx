import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Nav } from '../';
import { accounts } from '../../accounts';
import { TransactionDetail } from './TransactionDetail';
import './transactions.css';

export const transactionPath = '/transactions';

export const Transactions = ({ location: { pathname } }) => {
  const overrideActive =
    pathname === transactionPath ? `${transactionPath}/${accounts.defaultAccount}` : '';

  const accountNav = accounts.list.map(account => ({
    to: `${transactionPath}/${account}`,
    label: account,
  }));
  return (
    <div>
      <div className="transaction-accounts">
        <Nav items={accountNav} overrideActive={overrideActive} />
        <Switch>
          <Route exact path={transactionPath} component={TransactionDetail} />
          <Route path={`${transactionPath}/:account`} component={TransactionDetail} />
        </Switch>
      </div>
    </div>
  );
};
