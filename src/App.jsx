import React from 'react';
import './index.css';
import { Content } from './components';

// to try: https://codepen.io/ogre14t/pen/KmWjeo

const App = () => (
  <div className="App">
    <div className="header">
      <h1>the investment experiment</h1>
      <span className="nav">about</span>
      <span className="nav">results</span>
      <span className="nav">transactions</span>
      <span className="nav">blog</span>
    </div>
    <Content />
  </div>
);

export default App;
