import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import './theexperiment.css';
import { Nav } from '../';
import { Overlord, Barbarossa, Dynamo, Manhattan } from './';

const TheExperimentBase = ({ location: { pathname } }) => {
  const overrideActive = pathname === '/theexperiment' ? '/theexperiment/overlord' : '';
  return (
    <div>
      <div className="intro">
        <span>
          <p>
            Tired of conflicting advice about how to invest my money, and certain that with a bit of
            care and knowledge that I can do better, I’ve decided to run an experiment with 4
            accounts using different strategies for investing and track the results over time.
          </p>
          <p>It takes a long time to see proper outcomes, so I will run this experiment from</p>
          <p className="dates">January 1, 2020 &mdash; January 1, 2025</p>
          <p>
            The consistency across all accounts will be consistent contributions of new cash on a
            regular basis.
          </p>
          <p>The codenames and guidelines for each account are documented below</p>
        </span>
      </div>
      <div className="accounts">
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
