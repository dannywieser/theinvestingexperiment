import React from 'react';
import './index.css';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { Header, Nav, TheExperiment, Results, Transactions, Blog } from './components';

const App = () => (
  <div className="App">
    <Router>
      <Redirect from="/" to="/theexperiment/overlord" />
      <Header />
      <Nav
        items={[
          { to: '/theexperiment', label: 'theexperiment' },
          { to: '/transactions', label: 'transactions' },
          { to: '/results', label: 'results' },
          { to: '/blog', label: 'blog' },
        ]}
      />
      <Switch>
        <Route exact path="/theexperiment" component={TheExperiment} />
        <Route exact path="/theexperiment/*" component={TheExperiment} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/results" component={Results} />
        <Route path="/blog" component={Blog} />
      </Switch>
    </Router>
  </div>
);

export default App;
