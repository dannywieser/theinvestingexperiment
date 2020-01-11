import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import './theexperiment.css';
import { Nav } from '../';
import { Overlord, Barbarossa, Dynamo, Manhattan, Intro } from './';

const TheExperimentBase = ({ location: { pathname } }) => {
  const overrideActive = pathname === '/' ? '/overlord' : '';
  return (
    <div>
      <Intro />
      <div className="accounts card">
        <h2>the accounts</h2>
        <Nav
          items={[
            { to: '/overlord', label: 'overlord' },
            { to: '/barbarossa', label: 'barbarossa' },
            { to: '/dynamo', label: 'dynamo' },
            { to: '/manhattan', label: 'manhattan' },
          ]}
          overrideActive={overrideActive}
        />

        <Switch>
          <Route exact path="/" component={Overlord} />
          <Route path="/overlord" component={Overlord} />
          <Route path="/barbarossa" component={Barbarossa} />
          <Route path="/dynamo" component={Dynamo} />
          <Route path="/manhattan" component={Manhattan} />
        </Switch>
      </div>
    </div>
  );
};

export const TheExperiment = withRouter(TheExperimentBase);
