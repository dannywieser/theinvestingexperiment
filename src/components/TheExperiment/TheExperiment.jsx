import React from 'react';
import { withRouter } from 'react-router-dom';
import './theexperiment.css';
import { Nav } from '../';
import { Overlord } from './';

const TheExperimentBase = ({ location: { pathname } }) => {
  const overrideActive = pathname === '/' ? '/overlord' : '';
  console.log(overrideActive, location);
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
          <p>Here are the codenames and guidelines for each account</p>
        </span>
      </div>
      <div className="accounts">
        <Nav
          items={[
            { to: '/overlord', label: 'overlord' },
            { to: '/barbarossa', label: 'barbarossa' },
            { to: '/dynamo', label: 'dynamo' },
            { to: '/manhattan', label: 'manhattan' },
          ]}
          overrideActive={overrideActive}
        />
        <Overlord />
      </div>
    </div>
  );
};

export const TheExperiment = withRouter(TheExperimentBase);
