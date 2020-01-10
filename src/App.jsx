import React from 'react';
import 'babel-polyfill';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header, Nav, TheExperiment, Results, Transactions, Blog } from './components';

const App = () => (
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
        items={[
          { to: '/theexperiment', label: 'theexperiment' },
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
);

export default App;
