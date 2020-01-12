import React from 'react';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header, Nav, TheExperiment, Results, Transactions, Blog } from './components';

import './index.css';
import store from './state/store';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Router>
        <Route
          path="/"
          render={({ location }) => {
            if (typeof window.ga === 'function') {
              window.ga('set', 'page', location.pathname + location.search);
              window.ga('send', 'pageview');
            }
            return null;
          }}
        />
        <Header />
        <Nav
          contact
          items={[
            { to: '/theexperiment', label: 'theexperiment' },
            { to: '/blog', label: 'blog' },
            { to: '/results', label: 'results' },
            { to: '/transactions', label: 'transactions' },
          ]}
        />
        <Switch>
          <Redirect exact from="/" to="/theexperiment" />
          <Route path="/theexperiment" component={TheExperiment} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/results" component={Results} />
          <Route path="/blog" component={Blog} />
        </Switch>
      </Router>
    </div>
  </Provider>
);

export default App;
