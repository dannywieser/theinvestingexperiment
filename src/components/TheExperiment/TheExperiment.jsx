import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Nav } from '../Nav';
import { Overlord } from './Overlord';
import { Barbarossa } from './Barbarossa';
import { Dynamo } from './Dynamo';
import { Manhattan } from './Manhattan';
import { Intro } from './Intro';
import './theexperiment.css';

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
    </div>
  );
};

export const TheExperiment = withRouter(TheExperimentBase);
