import React from 'react';
import './index.css';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Header, Nav } from './components';

const App = () => (
  <div className="App">
    <Router>
      <Redirect from="/" to="theexperiment" />
      <Header />
      <Nav />
    </Router>
  </div>
);

export default App;
