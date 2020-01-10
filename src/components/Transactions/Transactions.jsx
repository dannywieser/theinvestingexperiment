import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './transactions.css';

import { Nav } from '../';
import { TransactionDetail } from './TransactionDetail';

export const Transactions = () => {
  return (
    <div>
      <div className="transaction-accounts">
        <Nav
          items={[
            { to: '/transactions/overlord', label: 'overlord' },
            { to: '/transactions/barbarossa', label: 'barbarossa' },
            { to: '/transactions/dynamo', label: 'dynamo' },
            { to: '/transactions/manhattan', label: 'manhattan' },
          ]}
        />
        <Switch>
          <Route path="/transactions/:account" component={TransactionDetail} />
        </Switch>
      </div>
    </div>
  );
};
