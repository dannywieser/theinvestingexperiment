import React from 'react';
import './index.css';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { Header, Nav, TheExperiment, Results, Transactions, Blog } from './components';

const App = () => (
  <div className="App">
    <Router>
      <Redirect from="/" to="theexperiment" />
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/theexperiment" component={TheExperiment} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/results" component={Results} />
        <Route path="/blog" component={Blog} />
      </Switch>
    </Router>
  </div>
);

export default App;
