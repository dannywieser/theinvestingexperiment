import React from 'react';
import './theexperiment.css';
import { Nav } from '../';
import { Overlord } from './';

export const TheExperiment = () => (
  <div>
    <div className="intro">
      <span>
        <p>
          Tired of conflicting advice about how to invest my money, and certain that with a bit of
          care and knowledge that I can do better, I’ve decided to run an experiment with 4 accounts
          using different strategies for investing and track the results over time.
        </p>
        <p>It takes a long time to see proper outcomes, so I will run this experiment from</p>
        <p className="dates">January 1, 2020 &mdash; January 1, 2025</p>
        <p>Here are the codenames and guidelines for each account</p>
      </span>
    </div>
    <div class="accounts">
      <Nav
        items={[
          { to: '/theexperiment/overlord', label: 'overlord' },
          { to: '/theexperiment/barbarossa', label: 'barbarossa' },
          { to: '/theexperiment/dynamo', label: 'dynamo' },
          { to: '/theexperiment/manhattan', label: 'manhattan' },
        ]}
      />
      <Overlord />
    </div>
  </div>
);
