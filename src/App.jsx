import React from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header, Nav, TheExperiment, Results, Transactions, Blog } from './components';

const App = () => (
  <div className="App">
    <Router basename="/theexperiment">
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
      <Nav items={[{ to: '/', label: 'theexperiment' }]} />
      <Switch>
        <Route path="/" component={TheExperiment} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/results" component={Results} />
        <Route path="/blog" component={Blog} />
      </Switch>
    </Router>
  </div>
);

export default App;
