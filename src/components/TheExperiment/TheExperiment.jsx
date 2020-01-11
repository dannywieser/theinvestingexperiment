import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import './theexperiment.css';
import { Nav, Footer } from '../';
import { Overlord, Barbarossa, Dynamo, Manhattan, Intro } from './';

const TheExperimentBase = ({ location: { pathname } }) => {
  const overrideActive = pathname === '/theexperiment' ? '/theexperiment/overlord' : '';
  return (
    <div>
      <Intro />
      <div className="accounts card">
        <h2>the accounts</h2>
        <Nav
          items={[
            { to: '/theexperiment/overlord', label: 'overlord' },
            { to: '/theexperiment/barbarossa', label: 'barbarossa' },
            { to: '/theexperiment/dynamo', label: 'dynamo' },
            { to: '/theexperiment/manhattan', label: 'manhattan' },
          ]}
          overrideActive={overrideActive}
        />

        <Switch>
          <Route exact path="/theexperiment/" component={Overlord} />
          <Route path="/theexperiment/overlord" component={Overlord} />
          <Route path="/theexperiment/barbarossa" component={Barbarossa} />
          <Route path="/theexperiment/dynamo" component={Dynamo} />
          <Route path="/theexperiment/manhattan" component={Manhattan} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export const TheExperiment = withRouter(TheExperimentBase);
